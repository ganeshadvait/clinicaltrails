"use client";
import './searchstyles.css';
import React, { useState, useEffect } from 'react';

export default function Search({ onSearchChange, searchQuery }) {  
    const [searchvalue, setSearchvalue] = useState('');

    
    useEffect(() => {
        setSearchvalue(searchQuery);
    }, [searchQuery]);

    const handleInputChange = (e) => {
        const value = e.target.value;  
        setSearchvalue(value);         
        onSearchChange(value);         
    };

    function searchnow() {
        console.log('Search value:', searchvalue);
        if (onSearchChange) {
            onSearchChange(searchvalue); 
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchnow();  
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
                    value={searchvalue}  
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
        </section>
    );
}
