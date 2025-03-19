
"use client";
import React, {Suspense} from "react";
import { useSearchParams } from "next/navigation";
import Search from "./search/search";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
// Updated import path – ensure your folder name is correct.
import { useStore } from "../strore/useStore";
import { FilterButton } from "./filterButton";
import '../app/index.scss';

export default function Clinical() {
  // Default to empty string if not provided.
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("q") || "";
  const location = searchParams.get("location") || "";
  const locationValue = location || "";
  console.log('location', locationValue);

  const [pageNumber, setPageNumber] = useState(1);
  const [active, setActive] = useState(false);
  const [isRecruit, setIsRecruit] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [isMale, setIsMale] = useState(false);
  const [isError, setIsError] = useState("");
  // Ensure age is always a number by default.
  const [age, setAge] = useState({ minAge: 16, maxAge: 90 });
  const [selectedPhases, setSelectedPhases] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPhases((prev) =>
      checked ? [...prev, name] : prev.filter((phase) => phase !== name)
    );
  };

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
      `AREA%5BMinimumAge%5DRANGE%5BMIN%2C+${age.minAge}+years%5D+AND+AREA%5BMaximumAge%5DRANGE%5B${age.minAge}+years%2C+${age.maxAge}+years%5D`
    );
    if (selectedPhases.length > 0) {
      const phaseFilter = selectedPhases
        .map((phase) => `AREA%5BPhase%5D+${phase}`)
        .join("+AND+");
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

  // 3. Pagination effect: fetches additional pages.
  // It now depends only on pageNumber and nextPageToken, ensuring filter changes don't trigger it.
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

  return (
    <>
    <Suspense>
    <section className="trailspage">
        <div className="inner_trailspage">
        <div className="sidebar">
  <div className="flex toggle_bar" onClick={() => setSidebarOpen(!sidebarOpen)}>
    <p>Filters</p>
    <span className={`flex arrow_btn ${sidebarOpen ? 'rotate-180' : ''}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
        <path stroke="currentColor" d="M13.5 5.5 8 11 2.5 5.5" />
      </svg>
    </span>
  </div>

  {/* Sidebar content */}
  <div className={`h-auto ${sidebarOpen ? 'h-full block fade-in' : 'hidden'} lg:block ${sidebarOpen ? 'block' : 'hidden'}`} >
    <div className="empty_box">
      <div className="side_bar_item">
        <FilterButton
          text={"Actively recruiting"}
          isSelect={isRecruit}
          setIsSelect={setIsRecruit}
        />
      </div>
      <div className="side_bar_item">
        <h4 className="mb-6">Age Filter</h4>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <label htmlFor="min_age" className="text-nowrap font-[400]" style={{ fontSize: '14px' }}>
              Minimum Age
            </label>
            <input
              type="number"
              value={age.minAge}
              id="min_age"
              onChange={(e) => setAge({ ...age, minAge: e.target.value })}
              className="rounded-lg border p-1 minimum_age mb-4"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="max_age" className="text-nowrap" style={{ fontSize: '14px' }}>
              Maximum Age
            </label>
            <input
              type="number"
              value={age.maxAge}
              id="max_age"
              onChange={(e) => setAge({ ...age, maxAge: e.target.value })}
              className="rounded-lg border p-1 minimum_age mb-2"
            />
          </div>
        </div>
      </div>
      <div className="side_bar_item">
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
      </div>
      <div className="side_bar_item">
        <h4 className="mb-6">Phases</h4>
        <div className="flex flex-col gap-3">
          {["phase1", "phase2", "phase3", "phase4"].map((phase) => (
            <label className="checkbox_container flex gap-4 items-center" key={phase}>
              <input
                type="checkbox"
                name={phase}
                checked={selectedPhases.includes(phase)}
                onChange={handleCheckboxChange}
              />
              <svg viewBox="0 0 64 64" height="2em" width="2em">
                <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
              </svg>
              {phase}
            </label>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

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
                  {locationValue.slice(0, 6) || "No search term"}{" "}
                  {locationValue && (
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


// sidebar baked
// <div className="sidebar">
// <h3 className="mb-8">Clinical Trials</h3>
// <p className="mb-8">Popular Listings</p>

// <FilterButton
//   text={"Actively recruiting"}
//   isSelect={isRecruit}
//   setIsSelect={setIsRecruit}
// />

// <h4>Age Filter</h4>
// <div className="flex flex-col gap-2">
//   <div className="flex items-center gap-2">
//     <label htmlFor="min_age" className="text-nowrap">
//       Minimum Age
//     </label>
//     <input
//       type="number"
//       value={age.minAge}
//       id="min_age"
//       onChange={(e) =>
//         setAge({ ...age, minAge: Number(e.target.value) })
//       }
//       className="rounded-lg border p-1"
//     />
//   </div>
//   <div className="flex items-center gap-2">
//     <label htmlFor="max_age" className="text-nowrap">
//       Maximum Age
//     </label>
//     <input
//       type="number"
//       value={age.maxAge}
//       id="max_age"
//       onChange={(e) =>
//         setAge({ ...age, maxAge: Number(e.target.value) })
//       }
//       className="rounded-lg border p-1"
//     />
//   </div>
// </div>

// <h4>Gender</h4>
// <FilterButton
//   text={"Female"}
//   isSelect={isFemale}
//   setIsSelect={setIsFemale}
// />
// <FilterButton
//   text={"Male"}
//   isSelect={isMale}
//   setIsSelect={setIsMale}
// />

// <h4>Phases</h4>
// <div className="flex flex-col">
//   {["phase1", "phase2", "phase3", "phase4"].map((phase) => (
//     <label key={phase}>
//       <input
//         type="checkbox"
//         name={phase}
//         checked={selectedPhases.includes(phase)}
//         onChange={handleCheckboxChange}
//       />
//       {phase}
//     </label>
//   ))}
// </div>
// </div>