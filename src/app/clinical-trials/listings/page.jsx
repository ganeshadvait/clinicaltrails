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
      <div className="flex ">
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <div className="flex items-center">
              Browse over <RollingNumber number={conditionData.length} />{" "}
              Clinical Trial Listings
            </div>
            <AlphabetScroll data={conditionData} setState={setCondition} />
          </div>
        )}
      </div>
    </>
  );
}
