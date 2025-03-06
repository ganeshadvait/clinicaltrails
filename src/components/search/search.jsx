"use client";
import './searchstyles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../loader/loader';


export default function Search({  onSearchChange, searchQuery, onSelectSuggestion }) {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);  
    const [isLoading, setIsLoading] = useState(false); 
    const [active, setActive] = useState(false);

    const backendUrl = process.env.NEXT_PUBLIC_SUGGESTIONS_URL || "";

    useEffect(() => {
        setSearchValue(searchQuery);
    }, [searchQuery]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearchChange(value);
    
       
        if (value.trim() === '') {            
            setSuggestions([]); 
            setActive(false); 
        } else{
            setActive(true);
        }
    
        setIsLoading(true);
    
        let config = {
            method: 'get',
            url: `${backendUrl}/fetch_suggestions?string=${value}`,
            headers: {}
        };
    
        axios.request(config)
            .then((response) => {
                console.log("API Response:", response.data); 
                setSuggestions(response.data);
                setSuggestions(response.data.suggestions || []); 
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching suggestions:", error);
                setIsLoading(false);
                setActive(false);
            });
    };
    

    function searchnow() {
        console.log('Search value:', searchValue);
        if (onSearchChange) {
            onSearchChange(searchValue);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchnow();
        }
    };

    const selectnPass = (suggestion) => {
        if (typeof onSelectSuggestion === 'function') {
          onSelectSuggestion(suggestion);
        } else {
          console.error('onSelectSuggestion is not a function');
        }
        setSearchValue(suggestion);
        alert('Selected: ' + suggestion);
        setSuggestions([]);  
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
                    onChange={handleInputChange} 
                    onKeyDown={handleKeyDown}  
                />
                <span onClick={searchnow} className='searchicon' style={{ cursor: 'pointer' }}>
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
