


import React, { useRef, useEffect } from "react";

export function AlphabetScroll({ conditionData }) {
  const conditionRefs = useRef({});

  const handleScroll = (letter) => {
    if (conditionRefs.current[letter]) {
      conditionRefs.current[letter]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Group conditions by their first letter
  const groupedConditions = conditionData.reduce((acc, condition) => {
    const firstLetter = condition.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(condition);
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

      <div className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto ">
        {Object.keys(groupedConditions).map((letter) => (
          <div key={letter} ref={(el) => (conditionRefs.current[letter] = el)}>
            <h2 className="text-lg font-bold text-blue-500">{letter}</h2>
            {groupedConditions[letter].map((condition, ind) => (
              <p key={ind} className="rounded border p-2">
                {condition}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
}

