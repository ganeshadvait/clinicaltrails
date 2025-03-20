import React, { useRef } from "react";

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

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {"123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            type="button"
            className="rounded bg-gray-200 px-2 py-1"
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
  );
}
