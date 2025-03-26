import { useEffect, useState } from "react";
import { FilterButton } from "./filterButton";
// import { useFilterContext } from "../context/filterContext";

export function FilterSection({
  isRecruit,
  setIsRecruit,
  age,
  setAge,
  isFemale,
  setIsFemale,
  isMale,
  setIsMale,
  selectedPhases,
  setSelectedPhases,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPhases((prev) =>
      checked ? [...prev, name] : prev.filter((phase) => phase !== name)
    );
  };
  return (
    <>
      <div className="sidebar">
        <div
          className="toggle_bar flex"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <p>Filters</p>
          <span className={`arrow_btn flex ${sidebarOpen ? "rotate-180" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path stroke="currentColor" d="M13.5 5.5 8 11 2.5 5.5" />
            </svg>
          </span>
        </div>

        {/* Sidebar content */}
        <div
          className={`h-auto ${
            sidebarOpen ? "fade-in block h-full" : "hidden"
          } lg:block ${sidebarOpen ? "block" : "hidden"}`}
        >
          <div className="empty_box">
            <div className="side_bar_item">
              <FilterButton
                text={"Actively recruiting"}
                isSelect={isRecruit}
                setIsSelect={setIsRecruit}
              />
            </div>
            <div className="side_bar_item">
              <h4 className="mb-6">Age Filter</h4>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="min_age"
                    className="text-nowrap font-[400]"
                    style={{ fontSize: "14px" }}
                  >
                    Minimum Age
                  </label>
                  <input
                    type="number"
                    value={age.minAge}
                    id="min_age"
                    onChange={(e) => setAge({ ...age, minAge: e.target.value })}
                    className="minimum_age mb-4 rounded-lg border p-1"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="max_age"
                    className="text-nowrap"
                    style={{ fontSize: "14px" }}
                  >
                    Maximum Age
                  </label>
                  <input
                    type="number"
                    value={age.maxAge}
                    id="max_age"
                    onChange={(e) => setAge({ ...age, maxAge: e.target.value })}
                    className="minimum_age mb-2 rounded-lg border p-1"
                  />
                </div>
              </div>
            </div>
            <div className="side_bar_item">
              <h4>Gender</h4>
              <FilterButton
                text={"Female"}
                isSelect={isFemale}
                setIsSelect={setIsFemale}
              />
              <FilterButton
                text={"Male"}
                isSelect={isMale}
                setIsSelect={setIsMale}
              />
            </div>
            <div className="side_bar_item">
              <h4 className="mb-6">Phases</h4>
              <div className="flex flex-col gap-3">
                {["phase1", "phase2", "phase3", "phase4"].map((phase) => (
                  <label
                    className="checkbox_container flex items-center gap-4"
                    key={phase}
                  >
                    <input
                      type="checkbox"
                      name={phase}
                      checked={selectedPhases.includes(phase)}
                      onChange={handleCheckboxChange}
                    />
                    <svg viewBox="0 0 64 64" height="2em" width="2em">
                      <path
                        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                        pathLength="575.0541381835938"
                        class="path"
                      ></path>
                    </svg>
                    {phase}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
