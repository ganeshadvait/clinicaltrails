"use client";
import React from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Loader from "../../../../../../components/loader/loader";
import axios from "axios";

export default function CountryPage() {
  const { country } = useParams();
  const [cityData, setCityData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const backendUrlGOVT = process.env.NEXT_PUBLIC_GOVT_URL || "";

  useEffect(() => {
    if (!country) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/city/${country}`);
        console.log("Response:", response.data);
        setCityData(response.data?.cities);
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
      {cityData.map((city) => (
        <li key={city}>
          <a
            href={`/clinical-trials/listings/location/international/${country}/${city}`}
          >
            {city}
          </a>
        </li>
      ))}
    </div>
  );
}
