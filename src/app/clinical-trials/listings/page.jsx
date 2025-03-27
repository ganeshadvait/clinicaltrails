"use client";

import { AlphabetScroll } from "../../../components/alphabetAutoScroll";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Loader from "@/components/loader/loader";
import LocationPage from "@/components/location";
import { Router } from "next/router";
import RollingNumber from "@/components/rollingNumbers";
import { useRouter } from "next/navigation";

export default function Listing() {
  const router = useRouter();
  const [conditionData, setConditionData] = React.useState([]);
  const [expand, setExpand] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [condition, setCondition] = React.useState("");
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const backendUrlGOVT = process.env.NEXT_PUBLIC_GOVT_URL || "";

  // const handleList = async () => {
  //   const cachedData = localStorage.getItem("conditionData");
  //   if (cachedData) {
  //     setConditionData(JSON.parse(cachedData));
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${backendUrl}/conditions`);
  //     setConditionData(response.data.conditions);
  //     localStorage.setItem(
  //       "conditionData",
  //       JSON.stringify(response.data.conditions)
  //     );
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleList = async () => {
    setLoading(true);
    let allConditions = [];
    let pageNumber = 1;

    try {
      while (216 > pageNumber) {
        const response = await axios.get(
          `https://api.decentrialz.com/conditions?page_number=${pageNumber}`
        );

        if (response.data && response.data.conditions.length > 0) {
          allConditions = [...allConditions, ...response.data.conditions];
          pageNumber++;
        }
      }

      setConditionData(allConditions);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!condition) return;
    router.push(`/clinical-trials/listings/condition/${condition}`);
  }, [condition]);

  useEffect(() => {
    handleList();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setExpand(true); 
      } else {
        setExpand(false); 
      }
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="abcd_section flex">
        {loading ? (
          <Loader />
        ) : (
          <div
            className={`expander_container relative p-4 ${
              expand ? "here_border" : "no_border"
            }`}
          >
            <div
              className={`expander flex items-center gap-2 ${
                expand ? "some_Class" : "no_border"
              }`}
              onClick={() => setExpand(!expand)}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-[16px] w-[16px] cursor-pointer">
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
                      color:
                        "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
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
                <div className="flex cursor-pointer items-center gap-2">
                  Browse over <RollingNumber number={conditionData.length} />{" "}
                  Conditions
                </div>
              </div>

              <span className={`relative ${expand ? "rotate_now" : ""}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path stroke="currentColor" d="M13.5 5.5 8 11 2.5 5.5" />
                </svg>
              </span>
            </div>

            <div className={`expand_content ${expand ? "show" : ""}`}>
              <AlphabetScroll data={conditionData} setState={setCondition} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
