"use client";

import { AlphabetScroll } from "../../../components/alphabetAutoScroll";
import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Loader from "@/components/loader/loader";
import LocationPage from "@/components/location";
import { Router } from "next/router";
import RollingNumber from "@/components/rollingNumbers";

export default function Listing() {
  const [conditionData, setConditionData] = React.useState([]);
  const [expand, setExpand] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [condition, setCondition] = React.useState("");
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const backendUrlGOVT = process.env.NEXT_PUBLIC_GOVT_URL || "";

  const handleList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/conditions`);
      console.log("Response:", response.data);
      setConditionData(response.data.conditions);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (!condition) return;
  //   Router.push(`/clinical-trials/listings/condition/${condition}`);
  // }, [condition]);

  useEffect(() => {
    handleList();
  }, []);

  // const handleLocation = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${backendUrl}/locations`);
  //     console.log("Response:", response.data);
  //     setConditionData({ ...response.data });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <div className="flex abcd_section">
        
        {loading ? (
          <Loader />
        ) : (

           <div className={`relative p-4 expander_container ${expand ? "here_border" : "no_border"}`}>
           <div
             className={`expander flex gap-2 items-center ${expand ? "some_Class" : "no_border"}`}
             onClick={() => setExpand(!expand)}
           >
             <div className="flex items-center gap-2">
               <span className="w-[16px] h-[16px] flex cursor-pointer">
               <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 256 256"
             focusable="false"
             style={{
               userSelect: "none",
               width: "100%",
               height: "100%",
               display: "inline-block",
               fill: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
               color: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
               flexShrink: 0,
             }}
           >
             <g
               color="var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))"
               weight="light"
             >
               <path d="M123.76,108.24a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48l-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48ZM128,32.49,159.51,64,128,95.51,96.49,64Zm4.24,115.27a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48ZM128,223.51,96.49,192,128,160.49,159.51,192Zm108.24-99.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,236.24,123.76ZM192,159.51,160.49,128,192,96.49,223.51,128Zm-83.76-35.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,108.24,123.76ZM64,159.51,32.49,128,64,96.49,95.51,128Z"></path>
             </g>
           </svg>
               </span>
               <h2 className="cursor-pointer">Browse over 40,000 Clinical Trial Listings</h2>
             </div>
         
             <span className={`relative ${expand ? "rotate_now" : ""}`}>
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" d="M13.5 5.5 8 11 2.5 5.5"/></svg>
             </span>
           </div>
         
           <div className={`expand_content ${expand ? "show" : ""}`}>
             <AlphabetScroll conditionData={conditionData} />
           </div>
         </div>

        )}
      </div>
    </>
  );
}
