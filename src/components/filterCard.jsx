import React from "react";

export function FilterCard({ label, setState }) {
  function handleState() {
    console.log("Label:", label);
    if (["Female", "Male", "Actively recruiting"].includes(label)) {
      setState(false);
    } else if (label.toLowerCase().startsWith("p")) {
      setState((prev) => {
        console.log("Before update:", prev);

        // Ensure `prev` is an array before filtering
        if (!Array.isArray(prev)) {
          console.warn("Expected an array, but got:", prev);
          return [];
        }

        // Remove only the clicked phase
        const updatedPhases = prev.filter((phase) => phase !== label);

        console.log("After update:", updatedPhases);

        return updatedPhases.length > 0 ? updatedPhases : []; // Ensure it always returns an array
      });
    } else {
      setState("");
    }
  }

  return (
    <div
      style={{ cursor: "pointer" }}
      className="resultsfor flex items-center"
      //   onClick={setState(false)}
    >
      {label}
      <div onClick={handleState}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
          // onClick={setState(false)}
        >
          <path stroke="currentColor" d="m3 3 10 10M13 3 3 13" />
        </svg>
      </div>
    </div>
  );
}
