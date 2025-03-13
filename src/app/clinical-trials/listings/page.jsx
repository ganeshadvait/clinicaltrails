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

  let url = `${backendUrlGOVT}/studies?format=json&query.cond=${searchValue}&countTotal=true&pageSize=10&pageToken=${nextPageToken}`;

  if (isRecruit) {
    url = `${backendUrlGOVT}/studies?format=json&query.cond=${searchValue}&filter.overallStatus=RECRUITING&countTotal=true&pageSize=10&pageToken=${nextPageToken}`;
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log("check these", response.data.response);
        clearTrails();
        updateTotalTrail(response.data.totalCount);
        updateTrails(response.data.studies);
        updateNextPageToken(response.data.nextPageToken);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pageNumber, isRecruit]); // dependencies

  console.log("list", trails);

  return (
    <>
      <section className="trailspage">
        <div className="inner_trailspage">
          <div className="sidebar">
            <h3>Clinical Trials</h3>
            <p> Popular Listigns</p>

            <FilterButton
              text={"Actively recruiting"}
              isSelect={isRecruit}
              setIsSelect={setIsRecruit}
            />
          </div>

          {/* //component by Ganesh is there before */}
          <div className="main">
            <Search />
            <div className="filters_bar">
           <div className="flex items-center">
             Results for{" "}
             <span
              style={{ cursor: "pointer" }}
              className="resultsfor flex items-center"
            >
              {searchValue.slice(0, 6)}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path stroke="currentColor" d="m3 3 10 10M13 3 3 13" />
              </svg>
            </span>{" "}
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

            <div className="flex flex-col gap-2">
              {trails.map((trail, ind) => (
                <div key={ind} className="trail_card my-4 border p-4">
                  <div className="flex items-start">
                    <div>
                      <Link
                        href={`/clinical-trials/listings/${
                          trail.protocolSection.identificationModule.nctId
                        }/${encodeURIComponent(
                          trail.protocolSection.identificationModule.briefTitle
                        )}`}
                      >
                        <h3 className="trail_title text-500" style={{cursor: 'pointer'}}>
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
                          <circle cx="8" cy="4.5" r="3" stroke="currentColor" />
                        </svg>
                      </span>
                      <p>{trail.protocolSection.statusModule.overallStatus}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-12 flex-wrap">
                      <div className="flex flex-col">
                        <h5 className="text-500 additional_title" >Phase</h5>
                        <p className="additional_info">{trail.protocolSection.designModule.phases}</p>
                      </div>
                      <div className="flex flex-col">
                      <h5 className="additional_title">
                        {
                          trail.protocolSection.sponsorCollaboratorsModule
                            .responsibleParty.type
                        }
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
                      >Read More</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                onClick={() => setPageNumber((prevPage) => prevPage + 1)}
                className="next"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// function removedComponent() {
//   return (
//     <>
//       <div className="main">
//         <Search />

//         <div className="filters_bar">
//           <div className="flex items-center">
//             Results for{" "}
//             <span
//               style={{ cursor: "pointer" }}
//               className="resultsfor flex items-center"
//             >
//               {searchValue.slice(0, 6)}{" "}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="none"
//                 viewBox="0 0 16 16"
//               >
//                 <path stroke="currentColor" d="m3 3 10 10M13 3 3 13" />
//               </svg>
//             </span>{" "}
//           </div>
//           <button
//             id="bottone1"
//             style={{
//               fontSize: "14px",
//               cursor: "pointer",
//             }}
//           >
//             Disclaimer
//           </button>
//           <div className="clear-filters">
//             {active ? (
//               <span
//                 className="clear-filters spa"
//                 style={{
//                   cursor: "pointer",
//                 }}
//               >
//                 <p>Clear filters</p>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="none"
//                   viewBox="0 0 16 16"
//                 >
//                   <path stroke="currentColor" d="m3 3 10 10M13 3 3 13" />
//                 </svg>
//               </span>
//             ) : (
//               <p>Clear filters</p>
//             )}
//           </div>
//           <Menu as="div" className="relative inline-block text-left">
//             <div>
//               <MenuButton className="shadow-xs inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
//                 Sort by
//                 <ChevronDownIcon
//                   aria-hidden="true"
//                   className="size-5 -mr-1 text-gray-400"
//                 />
//               </MenuButton>
//             </div>

//             <MenuItems
//               transition
//               className="data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden"
//             >
//               <div className="py-1">
//                 <MenuItem>
//                   <a
//                     href="#"
//                     className="data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden block px-4 py-2 text-sm text-gray-700"
//                   >
//                     Top rated
//                   </a>
//                 </MenuItem>
//                 <MenuItem>
//                   <a
//                     href="#"
//                     className="data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden block px-4 py-2 text-sm text-gray-700"
//                   >
//                     Relavent
//                   </a>
//                 </MenuItem>
//               </div>
//             </MenuItems>
//           </Menu>
//         </div>
//         {searchResults ? (
//           <div>
//             <p>Search Results</p>
//             <div>
//               {trails.map((trail, ind) => (
//                 <div key={ind} className="trail_card my-4 border p-4">
//                   <span className="featuredabsolute">Featured</span>
//                   <div className="title_status flex justify-between">
//                     <p>{`/clinical-trials/listings/${trail.nct_id}`}</p>
//                     {/* <Link
//                           href={`/clinical-trials/listings/${trail.nct_id}/${trail["Trial Name"]["Brief Title"]}`}
//                         >
//                           <h4
//                             className="trail_title"
//                             style={{
//                               cursor: "pointer",
//                             }}
//                           >
//                             {String(
//                               trail["Trial Name"]["Brief Title"] || "No Title"
//                             )}
//                           </h4>
//                         </Link> */}
//                     <div className="status_card">
//                       <span>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="12"
//                           height="12"
//                           fill="none"
//                           viewBox="0 0 16 16"
//                         >
//                           <path
//                             stroke="currentColor"
//                             d="M2.359 11.638 1.5 14.5h13l-.859-2.862A3 3 0 0 0 10.768 9.5H5.232a3 3 0 0 0-2.873 2.138Z"
//                           />
//                           <circle cx="8" cy="4.5" r="3" stroke="currentColor" />
//                         </svg>
//                       </span>
//                       {/* <p>{trail["Study Status"]["Overall Status"]}</p> */}
//                     </div>
//                   </div>
//                   <p className="trailsdescription">
//                     {trail["Basic Information"]["Description"].substring(
//                       0,
//                       200
//                     )}
//                   </p>

//                   <div className="additional_info">
//                     <div></div>
//                     <div>
//                       <button
//                         id="bottone1"
//                         style={{
//                           color: "#1a73e8",
//                           fontSize: "14px",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Read more
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
// <div className="pagination">
//   <button
//     type="button"
//     className="prev"
//     onClick={() => {
//       if (pageNumber > 1) {
//         setPageNumber((prevPage) => prevPage - 1);
//       }
//     }}
//   >
//     Prev
//   </button>

//   <p className="count">{pageNumber}</p>

//   <button
//     type="button"
//     onClick={() => setPageNumber((prevPage) => prevPage + 1)}
//     className="next"
//   >
//     Next
//   </button>
// </div>
//             </div>
//           </div>
//         ) : (
//           <div className="result_box">
//             {loading ? (
//               <Loader />
//             ) : (
//               <div>
//                 {trails.map((trail, ind) => (
//                   <div key={ind} className="trail_card my-4 border p-4">
//                     <span className="featuredabsolute">Featured</span>
//                     <div className="title_status flex justify-between">
//                       <Link
//                         href={`/${trail.nct_id}/${trail["Trial Name"]["Brief Title"]}`}
//                       >
//                         <h4
//                           className="trail_title"
//                           style={{
//                             cursor: "pointer",
//                           }}
//                         >
//                           {String(
//                             trail["Trial Name"]["Brief Title"] || "No Title"
//                           )}
//                         </h4>
//                       </Link>
//                       <div className="status_card">
//                         <span>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="12"
//                             height="12"
//                             fill="none"
//                             viewBox="0 0 16 16"
//                           >
//                             <path
//                               stroke="currentColor"
//                               d="M2.359 11.638 1.5 14.5h13l-.859-2.862A3 3 0 0 0 10.768 9.5H5.232a3 3 0 0 0-2.873 2.138Z"
//                             />
//                             <circle
//                               cx="8"
//                               cy="4.5"
//                               r="3"
//                               stroke="currentColor"
//                             />
//                           </svg>
//                         </span>
//                         <p>{trail["Study Status"]["Overall Status"]}</p>
//                       </div>
//                     </div>
//                     <p className="trailsdescription">
//                       {trail["Basic Information"]["Description"].substring(
//                         0,
//                         200
//                       )}
//                     </p>

//                     <div className="additional_info">
//                       <div></div>
//                       <div>
//                         <button
//                           id="bottone1"
//                           style={{
//                             color: "#1a73e8",
//                             fontSize: "14px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           Read more
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="pagination">
//                   <button
//                     type="button"
//                     className="prev"
//                     onClick={() => {
//                       if (pageNumber > 1) {
//                         setPageNumber((prevPage) => prevPage - 1);
//                       }
//                     }}
//                   >
//                     Prev
//                   </button>

//                   <p className="count">{pageNumber}</p>

//                   <button
//                     type="button"
//                     onClick={() => setPageNumber((prevPage) => prevPage + 1)}
//                     className="next"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
