"use client";
import { useRouter } from "next/navigation";
import Search from "../../components/search/search";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Loader from "../../components/loader/loader";
import axios from "axios";
import Link from "next/link";

export default function Clinical() {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [searchResults, setSearchResults] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSuggestionData, setSelectedSuggestionData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const backendUrl = process.env.NEXT_PUBLIC_SUGGESTIONS_URL || "";
  const router = useRouter();

  const handleSearchChange = (query, newQuery) => {
    setSearchQuery(query);
    setActive(query.length > 0);
    setSearchQuery(newQuery);
  };
  const handleSelectSuggestion = (suggestion) => {    
    console.log('Selected suggestion:', suggestion);        
    axios.get(`${backendUrl}/fetch_conditions?condition=${suggestion}`)
      .then((response) => {
        
        setSelectedSuggestionData(response.data.response || []);
        console.log('API Response:', response.data);
        setSearchResults(true);
      })
      .catch((error) => {
        console.error('Error fetching suggestion details:', error);
        setSearchResults(false);
      });
  };
  const clearFilters = () => {
    setSearchQuery("");
    setActive(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://clinicaltrials.gov/api/v2/studies`
        );
        setTrails(response.data.studies || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pageNumber]);

  const handleTitleClick = (title) => {
    console.log("Clicked title:", title);
    const urlFriendlyTitle = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/--+/g, "-")
      .trim();

    const url = `/${urlFriendlyTitle}`;
    router.push(url);

    setGeneratedUrl(url);
  };
 
  return (
    <>
      <section className="trailspage">
        <div className="inner_trailspage">
          <div className="sidebar">
            <h3>Clinical Trials</h3>
            <p> Popular Listigns</p>
          </div>
          <div className="main">
            <Search 
               onSearchChange={handleSearchChange} 
               searchQuery={searchQuery} 
               onSelectSuggestion={handleSelectSuggestion} 
             />

            <div className="filters_bar">
              <h3>Results for {searchQuery}</h3>
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
                    onClick={clearFilters}
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
            <h3>Clinical Trials</h3>
            {searchResults ? (
             <div>
              <p>searchResults</p>
             </div>
            ):(
              <div className="result_box">
              {loading ? (          
                <Loader />
              ) : (
                <div>
                  {trails.map((trail, ind) => (
                    <div key={ind} className="trail_card my-4 border p-4">
                      <span className="featuredabsolute">Featured</span>
                      <div className="title_status flex justify-between">
                        <Link
                          href={`clinical-trials/listings/${trail.protocolSection.identificationModule.nctId}/${trail.protocolSection.identificationModule.briefTitle}`}
                        >
                          <h4
                            className="trail_title"
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            {String(
                              trail["protocolSection"]["identificationModule"][
                                "briefTitle"
                              ] || "No Title"
                            )}
                          </h4>
                        </Link>
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
                      <p className="trailsdescription">
                        {trail.protocolSection.descriptionModule
                          ? trail.protocolSection.descriptionModule.briefSummary.substring(
                              0,
                              400
                            )
                          : "No Description"}
                      </p>

                      <div className="additional_info">
                        <div></div>
                        <div>
                          <button
                            id="bottone1"
                            style={{
                              color: "#1a73e8",
                              fontSize: "14px",
                              cursor: "pointer",
                            }}
                          >
                            Read more
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pagination">
                    <button
                      type="button"
                      className="prev"
                      onClick={() => {
                        if (pageNumber > 1) {
                          setPageNumber((prevPage) => prevPage - 10);
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
              )}
            </div>
            )}
            
          </div>
        </div>
      </section>
    </>
  );
}
