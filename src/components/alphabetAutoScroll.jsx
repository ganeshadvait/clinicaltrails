import "../app/index.scss";
import GoesOutComesInUnderline from './GoesOutComesInUnderline';

import React, { useState, useRef, useEffect } from "react";

export function AlphabetScroll({ data, setState }) {
  const [selectedLabel, setSelectedLabel] = useState("Home");
  const dataRefs = useRef({});

  useEffect(() => {
    console.log("Received data:", data);
  }, [data]);

  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-center text-red-500">No data available</p>;
  }

  const isTupleFormat = Array.isArray(data[0]) && data[0].length === 2;

  const groupedData = data.reduce((acc, item) => {
    if (!item) return acc;

    const key = isTupleFormat ? item[0] : item;
    if (typeof key !== "string") return acc;

    const firstLetter = key.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(
      isTupleFormat ? { name: item[0], value: item[1] } : { name: key }
    );
    return acc;
  }, {});

  const handleScroll = (letter) => {
    if (dataRefs.current[letter]) {
      dataRefs.current[letter].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const sortedLetters = Object.keys(groupedData).sort();

  return (
    <>
      <div className="p-4">
        <div className="mb-4 flex abcd_row gap-2">
          {"123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <button
              key={letter}
              type="button"
              className="abcd_options nav-item"
              onClick={() => handleScroll(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        <div className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto">
          {sortedLetters.length === 0 ? (
            <p className="text-center text-gray-500">No matching results</p>
          ) : (
            sortedLetters.map((letter) => (
              <div key={letter} ref={(el) => (dataRefs.current[letter] = el)}>
                <h2 className="pb-2 text-lg font-bold text-blue-500 mb-2 mt-2">
                  {letter}
                  <span className="ml-2 mt-3 mb-3  pl-2 pr-2 pt-1 pb-1 rounded-full"
                  style={{
                    border: '1px solid #ebeff6'
                  }}
                  >
                    {groupedData[letter].length}
                  </span>
                </h2>
                {groupedData[letter]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(({ name, value }, ind) => (
                    
                    <p
                      key={ind}
                      className=" p-4 cursor-pointer list_title"
                      style={{
                        borderBottom: '1px solid #ebeff6'
                      }}
                      onClick={() => setState(name)}
                    >
                      {name}{" "}
                      {value && (
                        <span className="rounded-2xl border border-slate-400 p-1">
                          {value} Clinical Trials
                        </span>
                      )}
                    </p>
                  ))}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
