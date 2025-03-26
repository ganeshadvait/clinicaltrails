"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Loader from "../../../../../../../components/loader/loader";
import axios from "axios";
import Clinical from "../../../../../../../components/searchpage";
import React, { Suspense } from "react";

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
      <Suspense>
        <div>
          <Clinical />
        </div>
      </Suspense>
    // <h1>Aleballeyy aleballeyy mawoooo.....</h1>
  );
}
