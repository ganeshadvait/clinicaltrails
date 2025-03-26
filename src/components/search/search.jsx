"use client";
import { useRouter } from "next/navigation";
import "./searchstyles.css";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { useStore } from "../../strore/useStore";
import { AutoComplete } from "../../components/autocompleteSearch";
import debounce from "lodash.debounce";

export default function Search() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState("");

  const { updateTotalTrail, updateTrails, clearTrails, updateNextPageToken } =
    useStore();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const backendUrlGOVT = process.env.NEXT_PUBLIC_GOVT_URL || "";

  const fetchData = useCallback(
    debounce(async () => {
      // Build the base URL
      let apiUrl = `${backendUrlGOVT}/studies?format=json`;

      if (searchValue.trim()) {
        apiUrl += `&query.cond=${encodeURIComponent(searchValue)}`;
      }
      if (location.trim()) {
        apiUrl += `&query.locn=${encodeURIComponent(location)}`;
      }
      apiUrl += `&countTotal=true&pageSize=10`;

      console.log("Final API URL:", apiUrl);

      try {
        const response = await axios.get(apiUrl);
        console.log("API Response:", response.data.response);

        clearTrails();
        updateTotalTrail(response.data.totalCount);
        updateTrails(response.data.studies);
        updateNextPageToken(response.data.nextPageToken || "");

        if (searchValue && location) {
          router.push(
            `/clinical-trials/listings/search?q=${encodeURIComponent(
              searchValue
            )}&location=${encodeURIComponent(location)}`
          );
        } else if (searchValue) {
          router.push(
            `/clinical-trials/listings/search?q=${encodeURIComponent(
              searchValue
            )}`
          );
        } else if (location) {
          router.push(
            `/clinical-trials/listings/search?location=${encodeURIComponent(
              location
            )}`
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 500),
    [
      searchValue,
      location,
      backendUrlGOVT,
      clearTrails,
      updateTotalTrail,
      updateTrails,
      updateNextPageToken,
      router,
    ]
  );

  return (
    <section className="search-box">
      <form className="search-form">
        <input
          type="text"
          placeholder="Condition, treatment, or keyword"
          className="searchinput"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className=" border h-[30px]" style={{
          borderColor: 'rgba(0, 0, 0, 0.1)'
        }}></div>
        <input
          type="text"
          placeholder="Location"
          className="searchinput"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          type="button"
          className="searchicon"
          style={{ cursor: "pointer" }}
          onClick={fetchData}
        >
          <svg
            className="searchiconscvg"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
          >
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" />
            <path stroke="currentColor" d="m11 11 4 4" />
          </svg>
        </button>
      </form>

      <AutoComplete
        key="searchValue"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        url={`${backendUrl}/conditions_suggestions?condition=${encodeURIComponent(
          searchValue
        )}`}
      />
      <AutoComplete
        key="location"
        searchValue={location}
        setSearchValue={setLocation}
        url={`${backendUrl}/locations_suggestions?area=${encodeURIComponent(
          location
        )}`}
      />
    </section>
  );
}
