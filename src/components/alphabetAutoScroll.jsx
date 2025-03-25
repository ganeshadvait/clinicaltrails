


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

  useEffect(() => {
    const navItems = document.querySelectorAll(".nav-item");
  
    const toggleSiblingClass = (items, index, offset, className, add) => {
      const sibling = items[index + offset];
      if (sibling) {
        sibling.classList.toggle(className, add);
      }
    };
  
    const handleMouseEnter = (index) => {
      navItems[index].classList.add("hover");
      toggleSiblingClass(navItems, index, -1, "sibling-close", true);
      toggleSiblingClass(navItems, index, 1, "sibling-close", true);
      toggleSiblingClass(navItems, index, -2, "sibling-far", true);
      toggleSiblingClass(navItems, index, 2, "sibling-far", true);
    };
  
    const handleMouseLeave = (index) => {
      navItems[index].classList.remove("hover");
      toggleSiblingClass(navItems, index, -1, "sibling-close", false);
      toggleSiblingClass(navItems, index, 1, "sibling-close", false);
      toggleSiblingClass(navItems, index, -2, "sibling-far", false);
      toggleSiblingClass(navItems, index, 2, "sibling-far", false);
    };
  
    navItems.forEach((item, index) => {
      item.addEventListener("mouseenter", () => handleMouseEnter(index));
      item.addEventListener("mouseleave", () => handleMouseLeave(index));
    });
  
    // ✅ Cleanup function to prevent memory leaks
    return () => {
      navItems.forEach((item, index) => {
        item.removeEventListener("mouseenter", () => handleMouseEnter(index));
        item.removeEventListener("mouseleave", () => handleMouseLeave(index));
      });
    };
  }, []);
  
  return (
    <>
    <div className="p-4">
      <div className="mb-4 flex gap-2 overflow-x-auto flex-wrap">
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
              <h2 className="text-lg font-bold text-blue-500">{letter}</h2>
              {groupedData[letter]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(({ name, value }, ind) => (
                  <p
                    key={ind}
                    className="rounded border p-2"
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

