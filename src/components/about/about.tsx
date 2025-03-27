"use client";

import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import RollingNumber from "../rollingNumbers";

export default function AboutinNumbers() {
  const [metrics, setMetrics] = useState({
    Active: 0,
    cities: 0,
    states: 0,
    countries: 0,
    sites: 0,
  });
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  // const backendUrlGOVT = process.env.NEXT_PUBLIC_GOVT_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/trialsinfo`);
        setMetrics(response.data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className="numbers_bar">
          <div className="flex flex-col items-center">
            <h2>
              <RollingNumber number={metrics.Active} styling="text-4xl gap-2" />
            </h2>
            <p>Active Trials</p>
          </div>
          <div className="flex flex-col items-center">
            <h2>
              <RollingNumber
                number={metrics.countries}
                styling="text-4xl gap-2"
              />
            </h2>

            <p>Countries</p>
          </div>
          <div className="flex flex-col items-center">
            <h2>
              <RollingNumber number={metrics.cities} styling="text-4xl gap-2" />
            </h2>
            <p>Cities</p>
          </div>
          <div className="flex flex-col items-center">
            <h2>
              <RollingNumber number={metrics.sites} styling="text-4xl gap-2" />
            </h2>
            <p>Sites</p>
          </div>
        </div>
      </section>
    </>
  );
}
