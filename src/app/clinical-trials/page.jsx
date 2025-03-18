"use client";
import React from "react";
import Search from "@/components/search/search";

const Page = () => {
  return (
    <section className="search_page">
      <Search />
      <div className="boxed_container">
        <p> some content</p>
      </div>
    </section>
  );
};

export default Page;
