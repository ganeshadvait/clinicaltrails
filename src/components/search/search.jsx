"use client";
import "./searchstyles.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loader from "../loader/loader";
import debounce from "lodash.debounce";

export default function Search({ searchQuery = "", onSelectSuggestion }) {
  const [searchValue, setSearchValue] = useState(searchQuery || ""); // Ensure it's always a string
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  // Sync with searchQuery when it changes
  useEffect(() => {
    setSearchValue(searchQuery || ""); // Ensure a defined value
  }, [searchQuery]);

  const fetchSuggestions = useCallback(
    debounce(async (value) => {
      try {
        const response = await axios.get(
          `${backendUrl}/fetch_suggestions?string=${value}`
        );
        console.log("API Response:", response.data);
        setSuggestions(response.data.suggestions || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [backendUrl] // Include backendUrl in dependencies to avoid stale values
  );

  const handleInputChange = (value) => {
    setSearchValue(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setActive(false);
      return;
    } else {
      setActive(true);
    }

    setIsLoading(true);
    fetchSuggestions(value);
  };

  const selectnPass = (suggestion) => {
    if (typeof onSelectSuggestion === "function") {
      onSelectSuggestion(suggestion);
    } else {
      console.error("onSelectSuggestion is not a function");
    }
    setSearchValue(suggestion);
    setSuggestions([]);
    setActive(false);
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
          value={searchValue} // Ensures it's always controlled
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <span className="searchicon" style={{ cursor: "pointer" }}>
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
        </span>
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
                  <li onClick={() => selectnPass(suggestion)}>{suggestion}</li>
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
