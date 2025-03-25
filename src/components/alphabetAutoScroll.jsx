
import '../app/index.scss';

import React, { useRef, useEffect } from "react";

export function AlphabetScroll({ data, setState }) {
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

    const key = isTupleFormat ? item[0] : item; // Extract country or condition name
    if (typeof key !== "string") return acc; // Skip invalid values

    const firstLetter = key.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(
      isTupleFormat ? { name: item[0], value: item[1] } : { name: key }
    );
    return acc;
  }, {});

  const sortedLetters = Object.keys(groupedData).sort();

  
  return (
    <>
    <div className="p-4">
      <div className="mb-4 flex gap-2 abcd_box">
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

      <div className="flex max-h-[100vh] flex-col gap-4 overflow-y-auto">
        {sortedLetters.length === 0 ? (
          <p className="text-center text-gray-500">No matching results</p>
        ) : (
          sortedLetters.map((letter) => (
            <div key={letter} ref={(el) => (dataRefs.current[letter] = el)}>
              <h2 className="text-lg font-bold text-blue-500">{letter}</h2>
              {groupedData[letter]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(({ name, value }, ind) => (
                  <ul
                  className="flex flex-col trials_list"
                  style={{
                    borderBottom: "1px solid #0000001a",
                  }}
                >
                  {data.map((item, ind) => (
                    <li
                      key={ind}
                      className="node_items each_trail relative group"
                      style={{
                        paddingTop: "16px",
                        paddingBottom: "16px",
                      }}
                      onClick={() => setState(item.name)}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span>{item.name}</span>
                        {item.value && (
                          <span className="rounded-2xl border border-slate-400 p-1">
                            {item.value} Clinical Trials
                          </span>
                        )}
                      </div>
                
                      {/* Button inside the same list item */}
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-4 top-1/2 transform -translate-y-1/2">
                        Know More
                      </button>
                    </li>
                  ))}
                </ul>
                
                  
                ))}
            </div>
          ))
        )}
      </div>
    </div>
    </>
    
  );
}


// <ul className="flex items-center justify-between trials_list"
// style={{
//   borderBottom: "1px solid #0000001a"
// }}
// >
//   <li
//   key={ind}
//   className=" node_items each_trail"
//   style={{
//     paddingTop:'16px',
//     paddingBottom:'16px'
//   }}
//   onClick={() => setState(name)}
// >
//   {name}{" "}
//   {value && (
//     <span className="rounded-2xl border border-slate-400 p-1">
//       {value} Clinical Trials
//     </span>
//   )}
// </li>
// <button>know more</button>
// </ul>