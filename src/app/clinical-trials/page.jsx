"use client";

// import Search from "../../components/search/search";
import { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported

export default function Clinical() {
  const [trails, setTrails] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/all?page_number=${pageNumber}`
        );
        setTrails(response.data.trials || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pageNumber]);

  return (
    <>
      {/* <Search /> */}
      <h3>Clinical Trials</h3>
      <div>
        {trails.map((trail, ind) => (
          <div key={ind} className="my-4 border p-4">
            <div className="flex justify-between">
              <h4>
                {String(trail["Trial Name"]["Brief Title"] || "No Title")}
              </h4>
              <p>{trail["Study Status"]["Overall Status"]}</p>
            </div>
            <p>
              {trail["Basic Information"]?.Description ||
                "No description available"}
            </p>
          </div>
        ))}
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber((prevPage) => prevPage - 10);
            }
          }}
        >
          Prev
        </button>

        <p>{pageNumber}</p>

        <button
          type="button"
          onClick={() => setPageNumber((prevPage) => prevPage + 10)}
        >
          Next
        </button>
      </div>
    </>
  );
}
