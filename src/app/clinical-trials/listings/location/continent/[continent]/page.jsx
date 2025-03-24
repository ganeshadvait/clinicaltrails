"use client";
import React from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Loader from "../../../../../../components/loader/loader";
import axios from "axios";
import { AlphabetScroll } from "@/components/alphabetAutoScroll";
import { useRouter } from "next/navigation";

export default function ContinentPage() {
  const router = useRouter();
  const { continent } = useParams();
  const [countryData, setCountryData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [country, setCountry] = React.useState("");

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

  useEffect(() => {
    if (country) {
      router.push(
        `/clinical-trials/listings/location/international/${country}`
      );
    }
  }, [country]);

  //   return

  return (
    <div>
      {loading && <Loader />}
      <h1>Continent Page</h1>
      {/* {conditionData.map((country) => (
        <li key={country}>
          <a
            href={`/clinical-trials/listings/location/international/${country}`}
          >
            {country}
          </a>
        </li>
      ))} */}
      <AlphabetScroll data={countryData} setState={setCountry} />
    </div>
  );
}
