import React from "react";

export function FilterButton({ text, isSelect, setIsSelect }) {
  return (
    <div
      onClick={() => setIsSelect(!isSelect)}
      className={`radio-input w-[100%] cursor-pointer ${
        isSelect ? "radio-input_checked" : ""
      }`}
    >
      <label className={`label ${isSelect ? "label_checked" : ""}`}>
        <input
          type="radio"
          name="value-radio"
          value="value-2"
          checked={isSelect}
          readOnly
          className={`inputradio ${isSelect ? "checked-input" : ""}`}
        />
        <p className={`small-font ${isSelect ? "selected-text" : ""}`}>
          {text}
        </p>
      </label>
    </div>
  );
}

// import React from "react";
// export function FilterButton({ text, isSelect, setIsSelect }) {
//   return (
//     <div
//       onClick={() => setIsSelect(!isSelect)}
//       className="flex items-center gap-2"
//     >
//       {!isSelect ? (
//         <svg
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <circle cx="12" cy="12" r="10" />
//         </svg>
//       ) : (
//         <svg
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M21.801 10A10 10 0 1 1 17 3.335" />
//           <path d="m9 11 3 3L22 4" />
//         </svg>
//       )}
//       <p>{text}</p>
//     </div>
//   );
// }

// <label key={phase}
// className="flex gap-2 p-2">
//   <input
//     type="checkbox"
//     name={phase}
//     checked={selectedPhases.includes(phase)}
//     onChange={handleCheckboxChange}
//   />
//    </label>

//  {sidebarOpen }
//             <div className="empty_box">
//             <div className="side_bar_item">
//           <FilterButton
//               text={"Actively recruiting"}
//               isSelect={isRecruit}
//               setIsSelect={setIsRecruit}
//             />
//           </div>
//           <div className="side_bar_item">
//           <h4 className="mb-6">Age Filter</h4>
//           <div className="flex flex-col gap-2">
//               <div className="flex flex-col gap-3">
//                 <label htmlFor="min_age" className="text-nowrap font-[400] " style={{
//                   fontSize:'14px'
//                 }}>
//                   Minimum Age
//                 </label>
//                 <input
//                   type="number"
//                   name=""
//                   value={age.minAge}
//                   id="min_age"
//                   onChange={(e) => setAge({ ...age, minAge: e.target.value })}
//                   className="rounded-lg border p-1 minimum_age mb-4"
//                 />
//               </div>
//               <div className="flex flex-col gap-3">
//                 <label htmlFor="max_age" className="text-nowrap " style={{
//                   fontSize:'14px'
//                 }}>
//                   Maximum Age
//                 </label>
//                 <input
//                   type="number"
//                   name=""
//                   value={age.maxAge}
//                   id="max_age"
//                   onChange={(e) => setAge({ ...age, maxAge: e.target.value })}
//                   className="rounded-lg border p-1 minimum_age mb-2"
//                 />
//               </div>
//             </div>
//             </div>
//             <div className="side_bar_item">
//             <h4>Gender</h4>

//             <FilterButton
//               text={"Female"}
//               isSelect={isFemale}
//               setIsSelect={setIsFemale}
//             />

//             <FilterButton
//               text={"Male"}
//               isSelect={isMale}
//               setIsSelect={setIsMale}
//             />
//             </div>
//             <div className="side_bar_item">
//             <h4 className="mb-6">Phases</h4>
//             <div className="flex flex-col gap-3">
//               {["phase1", "phase2", "phase3", "phase4"].map((phase) => (

//                 <label className="checkbox_container flex gap-4 items-center"

//                 >
//                 <input type="checkbox"
//                  name={phase}
//                 checked={selectedPhases.includes(phase)}
//                 onChange={handleCheckboxChange}
//                 />
//                 <svg viewBox="0 0 64 64" height="2em" width="2em">
//                   <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
//                 </svg>
//                 {phase}
//               </label>
//               ))}
//             </div>
//             </div>
// //             </div>
// <div className="sidebar">
//             <div className="flex toggle_bar"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               <p>Filters</p>
//             <span className={`flex arrow_btn ${sidebarOpen ? 'rotate-180' : ''}`}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" d="M13.5 5.5 8 11 2.5 5.5"/></svg>
//               </span>
//               <div className={`h-[0] ${sidebarOpen ? 'h-full block' : 'hidden'}`}>
//               {sidebarOpen && (
//   <div className={`empty_box ${sidebarOpen ? 'fade-in' : ''}`}>
//     <div className="side_bar_item">
//       <FilterButton
//         text={"Actively recruiting"}
//         isSelect={isRecruit}
//         setIsSelect={setIsRecruit}
//       />
//     </div>
//     <div className="side_bar_item">
//       <h4 className="mb-6">Age Filter</h4>
//       <div className="flex flex-col gap-2">
//         <div className="flex flex-col gap-3">
//           <label htmlFor="min_age" className="text-nowrap font-[400]" style={{ fontSize: '14px' }}>
//             Minimum Age
//           </label>
//           <input
//             type="number"
//             value={age.minAge}
//             id="min_age"
//             onChange={(e) => setAge({ ...age, minAge: e.target.value })}
//             className="rounded-lg border p-1 minimum_age mb-4"
//           />
//         </div>
//         <div className="flex flex-col gap-3">
//           <label htmlFor="max_age" className="text-nowrap" style={{ fontSize: '14px' }}>
//             Maximum Age
//           </label>
//           <input
//             type="number"
//             value={age.maxAge}
//             id="max_age"
//             onChange={(e) => setAge({ ...age, maxAge: e.target.value })}
//             className="rounded-lg border p-1 minimum_age mb-2"
//           />
//         </div>
//       </div>
//     </div>
//     <div className="side_bar_item">
//       <h4>Gender</h4>
//       <FilterButton
//         text={"Female"}
//         isSelect={isFemale}
//         setIsSelect={setIsFemale}
//       />
//       <FilterButton
//         text={"Male"}
//         isSelect={isMale}
//         setIsSelect={setIsMale}
//       />
//     </div>
//     <div className="side_bar_item">
//       <h4 className="mb-6">Phases</h4>
//       <div className="flex flex-col gap-3">
//         {["phase1", "phase2", "phase3", "phase4"].map((phase) => (
//           <label className="checkbox_container flex gap-4 items-center" key={phase}>
//             <input
//               type="checkbox"
//               name={phase}
//               checked={selectedPhases.includes(phase)}
//               onChange={handleCheckboxChange}
//             />
//             <svg viewBox="0 0 64 64" height="2em" width="2em">
//               <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
//             </svg>
//             {phase}
//           </label>
//         ))}
//       </div>
//     </div>
//   </div>
// )}
//                 </div>

//             </div>

//           </div>
