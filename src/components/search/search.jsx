"use client";
import "./searchstyles.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loader from "../loader/loader";
import debounce from "lodash.debounce";

export default function Search({ setTrails }) {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500);

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

  const handleTrails = () => {
    setActive(false);
    axios
      .get(`${backendUrl}/fetch_conditions?condition=${searchValue}`)
      .then((response) => {
        setTrails(response.data.response || []);
        console.log("API Response:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching suggestion details:", error);
      });
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
          onClick={handleTrails}
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
