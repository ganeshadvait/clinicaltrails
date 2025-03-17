"use client";

import { useSearchParams } from "next/navigation";
import Search from "../../../components/search/search";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useStore } from "../../../strore/useStore";
import { FilterButton } from "../../../components/filterButton";

export default function Clinical() {
  const [pageNumber, setPageNumber] = useState(1);
  const [active, setActive] = useState(false);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  const [isRecruit, setIsRecruit] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [isMale, setIsMale] = useState(false);
  const [isError, setIsError] = useState("");
  const [age, setAge] = useState({ minAge: 16, maxAge: 90 });
  const [selectedPhases, setSelectedPhases] = useState([]);

  console.log("searchValue:", searchValue);
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

  // let url = `${backendUrlGOVT}/studies?format=json&query.cond=${searchValue}&countTotal=true&pageSize=10&pageToken=${nextPageToken}`;

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPhases((prev) =>
      checked ? [...prev, name] : prev.filter((phase) => phase !== name)
    );
  };

  useEffect(() => {
    let url = `${backendUrlGOVT}/studies?format=json&query.cond=${searchValue}`;

    const filters = [];

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

    if (age || selectedPhases.length > 0) {
      let advancedFilters = [];

      if (age) {
        advancedFilters.push(
          `AREA%5BMinimumAge%5DRANGE%5BMIN%2C+${age.minAge}+years%5D+AND+AREA%5BMaximumAge%5DRANGE%5B${age.minAge}+years%2C+${age.maxAge}+years%5D`
        );
      }

      if (selectedPhases.length > 0) {
        const phaseFilter = selectedPhases
          .map((phase) => `AREA%5BPhase%5D+${phase}`)
          .join("+AND+");
        advancedFilters.push(phaseFilter);
      }

      filters.push(`filter.advanced=${advancedFilters.join("+AND+")}`);
    }

    if (filters.length > 0) {
      url += `&${filters.join("&")}`;
    }

    // Always include countTotal on first search
    url += `&countTotal=true&pageSize=10`;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log("check these", response.data);
        clearTrails();
        updateTrails(response.data.studies);
        updateTotalTrail(response.data.totalCount); // Only update on first search
        updateNextPageToken(response.data.nextPageToken || "");
        setIsError("");
      } catch (error) {
        setIsError(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isRecruit, isFemale, isMale, searchValue, age, selectedPhases]);

  // Separate effect for pagination (fetching next pages)
  useEffect(() => {
    if (pageNumber === 1) return; // Skip if it's the first page

    let url = `${backendUrlGOVT}/studies?format=json&query.cond=${searchValue}`;

    if (nextPageToken) {
      url += `&pageToken=${nextPageToken}`;
    }

    url += `&pageSize=10`;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log("check these", response.data);
        updateTrails((prev) => [...prev, ...response.data.studies]); // Append new results
        updateNextPageToken(response.data.nextPageToken || "");
        setIsError("");
      } catch (error) {
        setIsError(error);
        console.error("Error fetching next page:", error);
      }
    };

    fetchData();
  }, [pageNumber]);

  console.log("list", trails);

  return (
    <>
      <section className="trailspage">
        <div className="inner_trailspage">
          <div className="sidebar">
            <h3 className="mb-8">Clinical Trials</h3>
            <p className="mb-8"> Popular Listigns</p>

            <FilterButton
              text={"Actively recruiting"}
              isSelect={isRecruit}
              setIsSelect={setIsRecruit}
            />

            <h4>Age Filter</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label htmlFor="min_age" className="text-nowrap">
                  Minimum Age
                </label>
                <input
                  type="number"
                  name=""
                  value={age.minAge}
                  id="min_age"
                  onChange={(e) => setAge({ ...age, minAge: e.target.value })}
                  className="rounded-lg border p-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="max_age" className="text-nowrap">
                  Maximum Age
                </label>
                <input
                  type="number"
                  name=""
                  value={age.maxAge}
                  id="max_age"
                  onChange={(e) => setAge({ ...age, maxAge: e.target.value })}
                  className="rounded-lg border p-1"
                />
              </div>
            </div>

            <h4>Gender</h4>

            <FilterButton
              text={"Female"}
              isSelect={isFemale}
              setIsSelect={setIsFemale}
            />

            <FilterButton
              text={"Male"}
              isSelect={isMale}
              setIsSelect={setIsMale}
            />

            <h4>Phases</h4>
            <div className="flex flex-col">
              {["phase1", "phase2", "phase3", "phase4"].map((phase) => (
                <label key={phase}>
                  <input
                    type="checkbox"
                    name={phase}
                    checked={selectedPhases.includes(phase)}
                    onChange={handleCheckboxChange}
                  />
                  {phase}
                </label>
              ))}
            </div>
          </div>

          {/* //component by Ganesh is there before */}
          <div className="main">
            <Search />
            <div className="filters_bar">
              <div
                className="flex items-center "
                style={{
                  gap: "10px",
                }}
              >
                Results for{" "}
                <span
                  style={{ cursor: "pointer" }}
                  className="resultsfor flex items-center"
                >
                  {searchValue?.slice(0, 6) || "No search term"}{" "}
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
              </div>

              <button
                id="bottone1"
                style={{
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Disclaimer
              </button>
              <div className="clear-filters">
                {active ? (
                  <span
                    className="clear-filters spa"
                    style={{
                      cursor: "pointer",
                    }}
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

                <MenuItems
                  transition
                  className="data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="#"
                        className="data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden block px-4 py-2 text-sm text-gray-700"
                      >
                        Top rated
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden block px-4 py-2 text-sm text-gray-700"
                      >
                        Relavent
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>

            {isError ? (
              <p>Got an Error</p>
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
                            {
                              trail.protocolSection.identificationModule
                                .briefTitle
                            }
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
                          <p className="additional_info">
                            {trail.protocolSection.designModule.phases}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <h5 className="additional_title">
                            {trail?.protocolSection?.sponsorCollaboratorsModule
                              ?.responsibleParty?.type || "N/A"}
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
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {nextPageToken ? (
              <div className="pagination">
                <p>
                  {totalTrails} of {pageNumber * 10}{" "}
                </p>
                <button
                  type="button"
                  className="prev"
                  onClick={() => {
                    if (pageNumber > 1) {
                      setPageNumber((prevPage) => prevPage - 1);
                    }
                  }}
                >
                  Prev
                </button>

                <p className="count">{pageNumber}</p>

                <button
                  type="button"
                  onClick={() => {
                    setPageNumber((prevPage) => prevPage + 1);
                  }}
                  className="next"
                >
                  Next
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
