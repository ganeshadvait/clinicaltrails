"use client";
// import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import Search from "./search/search";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
// Updated import path – ensure your folder name is correct.
import { useStore } from "../strore/useStore";
import "../app/index.scss";
import { FilterSection } from "./filterSection";
// import { useRouter } from "next/router";
import GoesOutComesInUnderline from "../components/GoesOutComesInUnderline";

export default function Clinical() {
  // const router = useRouter();
  // const { condition } = router.query;
  let condition = "";
  let locationValueInURL = "";
  const pathname = usePathname();
  if (pathname.startsWith("/clinical-trials/listings/condition")) {
    const pathSegments = pathname?.split("/").filter(Boolean);
    condition = pathSegments.pop();
  }

  if (
    pathname.startsWith("/clinical-trials/listings/location/international/") &&
    pathname.split("/").length >= 6
  ) {
    console.log("pathname", pathname);
    const pathSegments = pathname?.split("/").filter(Boolean);
    locationValueInURL = pathSegments.pop();
    console.log("locationValueInURL", locationValueInURL);
  }

  const searchParams = useSearchParams();
  const searchValue =
    searchParams.get("q") || decodeURIComponent(condition) || "";

  const location =
    searchParams.get("location") ||
    decodeURIComponent(locationValueInURL) ||
    "";
  // const locationValue =
  //   location ||  || "";

  const [pageNumber, setPageNumber] = useState(1);
  const [active, setActive] = useState(false);
  const [isRecruit, setIsRecruit] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [isMale, setIsMale] = useState(false);
  const [isError, setIsError] = useState("");
  // Ensure age is always a number by default.
  const [age, setAge] = useState({ minAge: 0, maxAge: 100 });
  const [selectedPhases, setSelectedPhases] = useState([]);

  const {
    totalTrails,
    trails,
    nextPageToken,
    updateTotalTrail,
    updateTrails,
    clearTrails,
    updateNextPageToken,
  } = useStore();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const backendUrlGOVT = process.env.NEXT_PUBLIC_GOVT_URL || "";

  // Helper function to build filter query string from current filters
  const buildFilterString = () => {
    const filters = [];

    if (location) {
      filters.push(`query.locn=${encodeURIComponent(location)}`);
    }

    if (isRecruit) {
      filters.push("filter.overallStatus=RECRUITING");
    }

    if (isFemale && isMale) {
      filters.push("aggFilters=sex%3Af%2Csex%3Am");
    } else if (isFemale) {
      filters.push("aggFilters=sex%3Af");
    } else if (isMale) {
      filters.push("aggFilters=sex%3Am");
    }

    // Advanced filters for age and phases
    const advancedFilters = [];
    advancedFilters.push(
      `AREA%5BMinimumAge%5DRANGE%5BMIN%2C+${age.maxAge}+years%5D+AND+AREA%5BMaximumAge%5DRANGE%5B${age.minAge}+years%2C+MAX%5D`
    );
    if (selectedPhases.length > 0) {
      const phaseFilter = selectedPhases
        .map((phase) => `AREA%5BPhase%5D+${phase}`)
        .join("+OR+");
      advancedFilters.push(phaseFilter);
    }

    return filters.length > 0 || advancedFilters.length > 0
      ? `&${filters.join("&")}${
          advancedFilters.length > 0
            ? `&filter.advanced=${advancedFilters.join("+AND+")}`
            : ""
        }`
      : "";
  };

  // 1. Reset pageNumber to 1 whenever any filter changes.
  // This ensures the main fetch (for page 1) is called instead of triggering pagination.
  useEffect(() => {
    setPageNumber(1);
  }, [searchValue, location, isRecruit, isFemale, isMale, age, selectedPhases]);

  // 2. Main data fetching effect: fetches page 1 when any filter changes.
  useEffect(() => {
    let url = `${backendUrlGOVT}/studies?format=json`;

    if (searchValue) {
      url += `&query.cond=${encodeURIComponent(searchValue)}`;
    }

    // Append filters built by our helper function.
    url += buildFilterString();

    // Always include countTotal and pageSize.
    url += `&countTotal=true&pageSize=10`;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log("Fetched data:", response.data);
        clearTrails();
        updateTrails(response.data.studies);
        updateTotalTrail(response.data.totalCount);
        updateNextPageToken(response.data.nextPageToken || "");
        setIsError("");
      } catch (error) {
        setIsError(error.message || "Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchValue, location, isRecruit, isFemale, isMale, age, selectedPhases]);

  useEffect(() => {
    if (pageNumber === 1) return; // Only run if pageNumber > 1

    let url = `${backendUrlGOVT}/studies?format=json`;

    if (searchValue) {
      url += `&query.cond=${encodeURIComponent(searchValue)}`;
    }

    // Append the same filter string to maintain consistency.
    url += buildFilterString();

    if (nextPageToken) {
      url += `&pageToken=${nextPageToken}`;
    }

    url += `&pageSize=10`;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log("Fetched next page data:", response.data);

        // Ensure response.data.studies is an array
        const newTrails = Array.isArray(response.data.studies)
          ? response.data.studies
          : [];

        clearTrails();
        updateTrails(newTrails);
        updateNextPageToken(response.data.nextPageToken || "");
        setIsError("");
      } catch (error) {
        setIsError(error.message || "Error fetching next page");
        console.error("Error fetching next page:", error);
      }
    };

    fetchData();
  }, [pageNumber]);

  console.log("searchValue.....", searchValue);

  return (
    <>
      <Suspense>
        <section className="trailspage">
          <div className="inner_trailspage">
            <FilterSection
              isRecruit={isRecruit}
              setIsRecruit={setIsRecruit}
              age={age}
              setAge={setAge}
              isFemale={isFemale}
              setIsFemale={setIsFemale}
              isMale={isMale}
              setIsMale={setIsMale}
              selectedPhases={selectedPhases}
              setSelectedPhases={setSelectedPhases}
            />

            <div className="main">
              <Search />
              <div className="filters_bar">
                <div className="flex items-center" style={{ gap: "10px" }}>
                  Results for{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    className="resultsfor flex items-center"
                  >
                    {searchValue.slice(0, 6) || "No search term"}{" "}
                    {searchValue && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path stroke="currentColor" d="m3 3 10 10M13 3 3 13" />
                      </svg>
                    )}
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    className="resultsfor flex items-center"
                  >
                    {location.slice(0, 6) || "location empty"}{" "}
                    {location && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path stroke="currentColor" d="m3 3 10 10M13 3 3 13" />
                      </svg>
                    )}
                  </span>
                </div>

                <button
                  id="bottone1"
                  style={{ fontSize: "14px", cursor: "pointer" }}
                >
                  Disclaimer
                </button>
                <div className="clear-filters">
                  {active ? (
                    <span
                      className="clear-filters spa"
                      style={{ cursor: "pointer" }}
                    >
                      <p>Clear filters</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path stroke="currentColor" d="m3 3 10 10M13 3 3 13" />
                      </svg>
                    </span>
                  ) : (
                    <p>Clear filters</p>
                  )}
                </div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="shadow-xs inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Sort by
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="size-5 -mr-1 text-gray-400"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
                    <div className="py-1">
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Top rated
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Relevant
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </div>

              {isError ? (
                <p>Got an Error: {isError}</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {trails.map((trail, ind) => (
                    <div key={ind} className="trail_card my-4 border p-4">
                      <div className="flex items-start">
                        <div>
                          <Link
                            href={`/clinical-trials/listings/${
                              trail.protocolSection.identificationModule.nctId
                            }/${encodeURIComponent(
                              trail.protocolSection.identificationModule
                                .briefTitle
                            )}`}
                          >
                            <h3
                              className="trail_title text-500"
                              style={{ cursor: "pointer" }}
                            >
                              <GoesOutComesInUnderline
                                label={
                                  trail.protocolSection.identificationModule
                                    .briefTitle
                                }
                              />
                            </h3>
                          </Link>
                          <p className="trailsdescription text-400">
                            {trail.protocolSection.descriptionModule.briefSummary.substring(
                              0,
                              200
                            )}
                          </p>
                        </div>
                        <div className="status_card">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              fill="none"
                              viewBox="0 0 16 16"
                            >
                              <path
                                stroke="currentColor"
                                d="M2.359 11.638 1.5 14.5h13l-.859-2.862A3 3 0 0 0 10.768 9.5H5.232a3 3 0 0 0-2.873 2.138Z"
                              />
                              <circle
                                cx="8"
                                cy="4.5"
                                r="3"
                                stroke="currentColor"
                              />
                            </svg>
                          </span>
                          <p>
                            {trail.protocolSection.statusModule.overallStatus}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex flex-wrap gap-12">
                          <div className="flex flex-col">
                            <h5 className="text-500 additional_title">Phase</h5>
                            {/* {trail.protocolSection.designModule.phases.length >
                            0
                              ? trail.protocolSection.designModule.phases.map(
                                  (phase, index) => (
                                    <p key={index} className="additional_info">
                                      {phase}
                                    </p>
                                  )
                                )
                              : "N/A"} */}
                            <p>
                              {Array.isArray(
                                trail.protocolSection.designModule.phases
                              )
                                ? trail.protocolSection.designModule.phases.map(
                                    (phase, index) => (
                                      <p
                                        key={index}
                                        className="additional_info"
                                      >
                                        {phase}
                                      </p>
                                    )
                                  )
                                : "N/A"}
                            </p>
                            {/* <p className="additional_info">
                              {trail.protocolSection.designModule.phases}
                            </p> */}
                          </div>
                          <div className="flex flex-col">
                            <h5 className="additional_title">
                              {trail?.protocolSection
                                ?.sponsorCollaboratorsModule?.responsibleParty
                                ?.type || "N/A"}
                            </h5>
                            <p className="additional_info">
                              {
                                trail.protocolSection.sponsorCollaboratorsModule
                                  .leadSponsor.name
                              }
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <h5 className="additional_title">Gender</h5>
                            <p className="additional_info">
                              {trail?.protocolSection?.eligibilityModule?.sex ||
                                "N/A"}
                            </p>
                          </div>
                        </div>
                        <div>
                          <button
                            id="bottone1"
                            style={{
                              color: "#1a73e8",
                              fontSize: "14px",
                              cursor: "pointer",
                            }}
                          >
                            <GoesOutComesInUnderline label="Know More" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {nextPageToken && (
                <div className="pagination">
                  <p>
                    {totalTrails} of {pageNumber * 10}
                  </p>
                  <button
                    type="button"
                    className="prev"
                    onClick={() => {
                      if (pageNumber > 1) setPageNumber((prev) => prev - 1);
                    }}
                  >
                    Prev
                  </button>
                  <p className="count">{pageNumber}</p>
                  <button
                    type="button"
                    onClick={() => setPageNumber((prev) => prev + 1)}
                    className="next"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </Suspense>
    </>
  );
}
