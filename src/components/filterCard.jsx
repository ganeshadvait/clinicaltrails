import React from "react";

export function FilterCard({ label, setState }) {
  function handleState() {
    if (["Female", "Male", "Actively recruiting"].includes(label)) {
      setState(false);
    } else if (label.includes("Phase")) {
      setState((prev) => {
        if (!Array.isArray(prev)) return [];

        return prev.filter((phase) => phase !== label);
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
