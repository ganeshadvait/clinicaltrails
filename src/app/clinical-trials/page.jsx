"use client";
import React, { useState, useEffect } from "react";
import Search from "@/components/search/search";
import Router from "next/router";
import { useRouter } from "next/router";


const Page = () => {
  return (
    <section className="search_page">
      <Search />
      <div className="boxed_container">
       <div>
        <p> some content</p>
       </div>

        
      </div>

      
    </section>
  );
};

export default Page;
