import Loader from "./loader/loader";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function AutoComplete({ searchValue, setSearchValue, url }) {
  const [debouncedValue, setDebouncedValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchValue]);

  // Fetch suggestions when the debounced value changes
  const fetchResults = useCallback(async () => {
    if (!debouncedValue.trim()) {
      setSuggestions([]);
      setActive(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(url);
      console.log("API Response:", response.data);

      // Check if this is the suggestions endpoint.
      if (url.includes("api.decentrialz.com")) {
        const results = response.data?.suggestions || [];
        setSuggestions(results);
        setActive(results.length > 0);
      } else {
        const results = response.data || [];
        setSuggestions(results);
        setActive(results.length > 0);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setActive(false);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedValue, url]);

  useEffect(() => {
    fetchResults();
  }, [debouncedValue, fetchResults]);

  return (
    <>
      {active && (
        <div className="suggestions-dropdown active">
          {isLoading ? (
            <Loader />
          ) : suggestions.length > 0 ? (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  style={{ display: "flex", cursor: "pointer" }}
                  onClick={() => {
                    setActive(false);
                    // Use display_name if available, otherwise the suggestion itself
                    setSearchValue(suggestion.display_name || suggestion);
                  }}
                >
                  {suggestion.display_name || suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </>
  );
}
