"use client";
import React from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Loader from "../../../../../../../components/loader/loader";
import axios from "axios";

export default function CityPage() {
  const { city } = useParams();
  const [conditionData, setConditionData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const backendUrlGOVT = process.env.NEXT_PUBLIC_GOVT_URL || "";

  useEffect(() => {
    if (!city) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/conditions/${city}`);
        console.log("Response:", response.data);
        setConditionData(response.data?.conditions);
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
      <h1>Condition Page</h1>
      {conditionData.map((condition) => (
        <li key={condition}>
          <a
          // href={`/clinical-trials/listings/location/international/${city}/${city}`}
          >
            {condition}
          </a>
        </li>
      ))}
    </div>
  );
}
