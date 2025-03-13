"use client";
import { useRouter } from "next/navigation";
import "./searchstyles.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loader from "../loader/loader";
import debounce from "lodash.debounce";
import { useStore } from "../../strore/useStore";

export default function Search() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [passValue, setPassValue] = useState("");

  const { updateTotalTrail, updateTrails, clearTrails, updateNextPageToken } =
    useStore();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const backendUrlGOVT = process.env.NEXT_PUBLIC_GOVT_URL || "";

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    if (debouncedValue) {
      fetchResults(debouncedValue);
    }
  }, [debouncedValue]);

  const fetchResults = (value) => {
    axios
      .get(`${backendUrl}/fetch_suggestions?string=${value}`)
      .then((response) => {
        setSuggestions(response.data.suggestions || []);
        console.log("API Response:", response.data);
        setPassValue(response.data.suggestions);
        console.log("passValue:", passValue);
        if (response.data.suggestions.length > 0) {
          setActive(true);
        } else {
          setActive(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchData = async () => {
    setActive(false);
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${backendUrlGOVT}/studies?format=json&query.cond=${searchValue}&countTotal=true&pageSize=10`
      );
      console.log("check these", response.data.response);
      clearTrails();
      updateTotalTrail(response.data.totalCount);
      updateTrails(response.data.studies);
      updateNextPageToken(response.data.nextPageToken);
      router.push(
        `/clinical-trials/listings?search=${encodeURIComponent(searchValue)}`
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section className="search-box">
      <form action="" className="search-form">
        <input
          type="text"
          placeholder="condition treatment or keyword"
          id="search"
          autoComplete="off"
          className="searchinput"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
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
            fill="none"
            viewBox="0 0 16 16"
          >
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" />
            <path stroke="currentColor" d="m11 11 4 4" />
          </svg>
        </button>
      </form>
      {active && (
        <div className="suggestions-dropdown active">
          {isLoading ? (
            <Loader />
          ) : suggestions.length > 0 ? (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index} // Move key to the outermost element
                  className="suggestion-item"
                  style={{ display: "flex", cursor: "pointer" }}
                >
                  <li
                    onClick={() => {
                      setActive(false);
                      setSearchValue(suggestion);
                    }}
                  >
                    {suggestion}
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </section>
  );
}
