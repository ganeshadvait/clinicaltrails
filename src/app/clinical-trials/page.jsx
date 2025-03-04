"use client";

import Search from "../../components/search/search";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Loader from '../../components/loader/loader';
import axios from "axios"; 

export default function Clinical() {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";



  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setActive(query.length > 0);  
};

const clearFilters = () => {
    setSearchQuery('');
    setActive(false); 
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${backendUrl}/all?page_number=${pageNumber}`
        );
        setTrails(response.data.trials || []);
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
    alert('title:' + title);
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
            <Search onSearchChange={handleSearchChange} />
            <div className="filters_bar">
            <h3>Results for {searchQuery}</h3>
            <button id="bottone1" style={{                    
                    fontSize: '14px',
                    cursor: 'pointer'                 
                }}>Disclaimer</button>
                <div className="clear-filters">
                {active ? (
                    <span
                    className="clear-filters spa" 
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={clearFilters}
                    >
                        <p>Clear filters</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                            <path stroke="currentColor" d="m3 3 10 10M13 3 3 13"/>
                        </svg>
                    </span>
                ) : (
                    <p>Clear filters</p>
                )}
            </div>
                <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
          Sort by
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Top rated
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Relavent
            </a>
          </MenuItem>
         
        </div>
      </MenuItems>
                </Menu>
            </div>
            <h3>Clinical Trials</h3>
            <div className="result_box">
            {loading ? (
        // Render the loader while data is being fetched
        <Loader />
      ) : (
        <div>
          {trails.map((trail, ind) => (
            <div key={ind} className="my-4 border p-4 trail_card">
                <span className="featuredabsolute">Featured</span>
              <div className="flex justify-between title_status">
                <h4 className="trail_title"
                onClick={() => handleTitleClick(trail["Trial Name"]["Brief Title"])}
                >
                  {String(trail["Trial Name"]["Brief Title"] || "No Title")}
                </h4>
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
                  <p>{trail["Study Status"]["Overall Status"]}</p>
                </div>
              </div>
              <p className="trailsdescription">
                  {trail["Basic Information"]?.Description
                    ? trail["Basic Information"].Description.split(' ').slice(0, 20).join(' ') + (trail["Basic Information"].Description.split(' ').length > 30 ? '...' : '')
                    : "No description available"}
                </p>

              <div className="additional_info">
                <div></div>
                <div>
                <button id="bottone1" style={{
                    color: '#1a73e8',
                    fontSize: '14px',
                    cursor: 'pointer'                 
                }}>Read more</button>
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
            </div>
        </div>
    </section>
     
     
    

   
    </>
  );
}
