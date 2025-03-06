"use client";
import './searchstyles.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Loader from '../loader/loader';
import debounce from 'lodash.debounce';


export default function Search({ searchQuery, onSelectSuggestion }) {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);  
    const [isLoading, setIsLoading] = useState(false); 
    const [active, setActive] = useState(false);

    const backendUrl = process.env.NEXT_PUBLIC_SUGGESTIONS_URL || "";

    useEffect(() => {
        setSearchValue(searchQuery);
    }, [searchQuery]);

    const handleInputChange = (value) => {
        setSearchValue(value);

        if (value.trim() === '') {
            setSuggestions([]);
            setActive(false);
            return;
        } else {
            setActive(true);
        }

        setIsLoading(true);

        fetchSuggestions(value);
    };
    const fetchSuggestions = useCallback(
        debounce(async (value) => {
            try {
                const response = await axios.get(`${backendUrl}/fetch_suggestions?string=${value}`);
                console.log("API Response:", response.data);
                setSuggestions(response.data.suggestions || []);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 300),
        []
    );
    


    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         searchnow();
    //     }
    // };

    const selectnPass = (suggestion) => {
        if (typeof onSelectSuggestion === 'function') {
            onSelectSuggestion(suggestion);
        } else {
            console.error('onSelectSuggestion is not a function');
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
                    value={searchValue}
                    onChange={(e) => handleInputChange(e.target.value)}                                         
                />
                <span  className='searchicon' style={{ cursor: 'pointer' }}>
                    <svg className='searchiconscvg' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 16 16">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor"/>
                        <path stroke="currentColor" d="m11 11 4 4"/>
                    </svg>
                </span>
            </form>
            {active ? (
                <div className={`suggestions-dropdown ${active ? 'active' : ''}`}>
                    {isLoading ? (
                        <Loader />  
                    ) : (
                        <>
                            {suggestions.length > 0 && (
                                 <ul className="suggestions-list">
                                     {suggestions.map((suggestion, index) => (
                                        <div
                                        className='suggestion-item'
                                         style={{
                                            display: 'flex',
                                            cursor: 'pointer'
                                        }}>
                                             <li key={index} onClick={() => selectnPass(suggestion)} style={{ cursor: 'pointer' }}>
                                            {suggestion}
                                        </li>
                                         
                                        </div>
                                        
                                     ))}
                                 </ul>
                             )}
                 
                 {suggestions.length === 0 && !isLoading && (
                     <p>No results found.</p>  
                 )}
                        </>
                    )}
                </div>
            ) : (
               <></>
            )}
            

        </section>
    );
}

// setSuggestions(response.data.suggestions || []); 