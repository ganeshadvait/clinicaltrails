"use client";
import React from "react";
import Search from "@/components/search/search";

const Page = () => {
  return (
    <section className="search_page">
      <Search />
      <div className="my-18">
      <h2 className="text-center text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
  Find a Trial Near You
</h2>
<p className="text-center text-base lg:text-lg text-gray-600 description">
  Discover clinical research opportunities that work for you. Explore study details and locations, and take the first steps to participating.
</p>

      </div>
      <div className="parent-container">
      <div className="boxed_container sticky top-0 z-10">
        <div className="content_image_box flex p-4">
          <div className="flex flex-col gap-2">
          <span className="for_icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" d="M8 9.5H5.232a3 3 0 0 0-2.873 2.138L1.5 14.5H9"/><circle cx="8" cy="4.5" r="3" stroke="currentColor"/><path fill="currentColor" d="m11.5 7.5 1.131 2.869L15.5 11.5l-2.869 1.131L11.5 15.5l-1.131-2.869L7.5 11.5l2.869-1.131L11.5 7.5Z"/></svg>
          </span>
          <h3 className="for_study">
          Find a study
          </h3>
          <p>
          Search or browse for a clinical trial near you.
          </p>
          <a href="#" className="px-5 py-2 text-base font-bold text-white fit_content   hover:bg-gray-600" style={{
              background: 'hsl(208, 92%, 54%)',
              borderRadius: '100px',
              paddingBlock: "1rem",
              marginTop:'10px'
            }}>
              Get in touch
            </a>
          </div>
          
        </div>
        <div className="content_image_box">
          <img className="image_for" src="/62a180449a8eed53acc8f076_ARMedia-147-min.jpg" alt="find a study" />
        </div>
      </div>
      <div className="boxed_container sticky top-0 z-10">
        <div className="content_image_box flex p-4">
          <div className="flex flex-col gap-2">
          <span className="for_icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" d="M8 9.5H5.232a3 3 0 0 0-2.873 2.138L1.5 14.5H9"/><circle cx="8" cy="4.5" r="3" stroke="currentColor"/><path fill="currentColor" d="m11.5 7.5 1.131 2.869L15.5 11.5l-2.869 1.131L11.5 15.5l-1.131-2.869L7.5 11.5l2.869-1.131L11.5 7.5Z"/></svg>
          </span>
          <h3 className="for_study">
          Find a study
          </h3>
          <p>
          Search or browse for a clinical trial near you.
          </p>
          <a href="#" className="px-5 py-2 text-base font-bold text-white fit_content   hover:bg-gray-600" style={{
              background: 'hsl(208, 92%, 54%)',
              borderRadius: '100px',
              paddingBlock: "1rem",
              marginTop:'10px'
            }}>
              Get in touch
            </a>
          </div>
          
        </div>
        <div className="content_image_box">
          <img className="image_for" src="/62a180449a8eed53acc8f076_ARMedia-147-min.jpg" alt="find a study" />
        </div>
      </div>
      <div className="boxed_container sticky top-0 z-10">
        <div className="content_image_box flex p-4">
          <div className="flex flex-col gap-2">
          <span className="for_icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" d="M8 9.5H5.232a3 3 0 0 0-2.873 2.138L1.5 14.5H9"/><circle cx="8" cy="4.5" r="3" stroke="currentColor"/><path fill="currentColor" d="m11.5 7.5 1.131 2.869L15.5 11.5l-2.869 1.131L11.5 15.5l-1.131-2.869L7.5 11.5l2.869-1.131L11.5 7.5Z"/></svg>
          </span>
          <h3 className="for_study">
          Find a study
          </h3>
          <p>
          Search or browse for a clinical trial near you.
          </p>
          <a href="#" className="px-5 py-2 text-base font-bold text-white fit_content   hover:bg-gray-600" style={{
              background: 'hsl(208, 92%, 54%)',
              borderRadius: '100px',
              paddingBlock: "1rem",
              marginTop:'10px'
            }}>
              Get in touch
            </a>
          </div>
          
        </div>
        <div className="content_image_box">
          <img className="image_for" src="/62a180449a8eed53acc8f076_ARMedia-147-min.jpg" alt="find a study" />
        </div>
      </div>
      </div>
      
    </section>
  );
};

export default Page;
