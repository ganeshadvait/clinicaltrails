"use client";
import React from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Loader from "../../../../../../components/loader/loader";
import axios from "axios";

export default function ContinentPage() {
  const { continent } = useParams();
  const [countryData, setCountryData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const backendUrlGOVT = process.env.NEXT_PUBLIC_GOVT_URL || "";

  console.log("Continent Page Loaded", continent);

  useEffect(() => {
    if (!continent) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/country/${continent}`);
        console.log("Response:", response.data);
        setCountryData(response.data?.countries);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //   return

  return (
    <div>
      {loading && <Loader />}
      <h1>Continent Page</h1>
      {countryData.map((country) => (
        <li key={country}>
          <a
            href={`/clinical-trials/listings/location/international/${country}`}
          >
            {country}
          </a>
        </li>
      ))}
    </div>
  );
}
