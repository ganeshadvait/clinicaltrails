"use client";
import React from "react";

export default function LocationPage() {
  return (
    <div>
      {["Africa", "Asia", "Europe", "North America", "South America"].map(
        (continent) => (
          <li key={continent}>
            <a
              href={`/clinical-trials/listings/location/continent/${continent}`}
            >
              {continent}
            </a>
          </li>
        )
      )}
    </div>
  );
}
