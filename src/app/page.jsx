import Image from "next/image";
import HowItWorks from '../components/How/how';
import HeroSection from '../components/hero/hero';

export default function Home() {
  return (
    <>
    <HeroSection />
    <HowItWorks />
   
    </>
  );
}


// function removedComponent() {
//   return (
//     <>
//       <div className="main">
//         <Search />

//         <div className="filters_bar">
//           <div className="flex items-center">
//             Results for{" "}
//             <span
//               style={{ cursor: "pointer" }}
//               className="resultsfor flex items-center"
//             >
//               {searchValue.slice(0, 6)}{" "}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="none"
//                 viewBox="0 0 16 16"
//               >
//                 <path stroke="currentColor" d="m3 3 10 10M13 3 3 13" />
//               </svg>
//             </span>{" "}
//           </div>
//           <button
//             id="bottone1"
//             style={{
//               fontSize: "14px",
//               cursor: "pointer",
//             }}
//           >
//             Disclaimer
//           </button>
//           <div className="clear-filters">
//             {active ? (
//               <span
//                 className="clear-filters spa"
//                 style={{
//                   cursor: "pointer",
//                 }}
//               >
//                 <p>Clear filters</p>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="none"
//                   viewBox="0 0 16 16"
//                 >
//                   <path stroke="currentColor" d="m3 3 10 10M13 3 3 13" />
//                 </svg>
//               </span>
//             ) : (
//               <p>Clear filters</p>
//             )}
//           </div>
//           <Menu as="div" className="relative inline-block text-left">
//             <div>
//               <MenuButton className="shadow-xs inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
//                 Sort by
//                 <ChevronDownIcon
//                   aria-hidden="true"
//                   className="size-5 -mr-1 text-gray-400"
//                 />
//               </MenuButton>
//             </div>

//             <MenuItems
//               transition
//               className="data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden"
//             >
//               <div className="py-1">
//                 <MenuItem>
//                   <a
//                     href="#"
//                     className="data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden block px-4 py-2 text-sm text-gray-700"
//                   >
//                     Top rated
//                   </a>
//                 </MenuItem>
//                 <MenuItem>
//                   <a
//                     href="#"
//                     className="data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden block px-4 py-2 text-sm text-gray-700"
//                   >
//                     Relavent
//                   </a>
//                 </MenuItem>
//               </div>
//             </MenuItems>
//           </Menu>
//         </div>
//         {searchResults ? (
//           <div>
//             <p>Search Results</p>
//             <div>
//               {trails.map((trail, ind) => (
//                 <div key={ind} className="trail_card my-4 border p-4">
//                   <span className="featuredabsolute">Featured</span>
//                   <div className="title_status flex justify-between">
//                     <p>{`/clinical-trials/listings/${trail.nct_id}`}</p>
//                     {/* <Link
//                           href={`/clinical-trials/listings/${trail.nct_id}/${trail["Trial Name"]["Brief Title"]}`}
//                         >
//                           <h4
//                             className="trail_title"
//                             style={{
//                               cursor: "pointer",
//                             }}
//                           >
//                             {String(
//                               trail["Trial Name"]["Brief Title"] || "No Title"
//                             )}
//                           </h4>
//                         </Link> */}
//                     <div className="status_card">
//                       <span>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="12"
//                           height="12"
//                           fill="none"
//                           viewBox="0 0 16 16"
//                         >
//                           <path
//                             stroke="currentColor"
//                             d="M2.359 11.638 1.5 14.5h13l-.859-2.862A3 3 0 0 0 10.768 9.5H5.232a3 3 0 0 0-2.873 2.138Z"
//                           />
//                           <circle cx="8" cy="4.5" r="3" stroke="currentColor" />
//                         </svg>
//                       </span>
//                       {/* <p>{trail["Study Status"]["Overall Status"]}</p> */}
//                     </div>
//                   </div>
//                   <p className="trailsdescription">
//                     {trail["Basic Information"]["Description"].substring(
//                       0,
//                       200
//                     )}
//                   </p>

//                   <div className="additional_info">
//                     <div></div>
//                     <div>
//                       <button
//                         id="bottone1"
//                         style={{
//                           color: "#1a73e8",
//                           fontSize: "14px",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Read more
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
// <div className="pagination">
//   <button
//     type="button"
//     className="prev"
//     onClick={() => {
//       if (pageNumber > 1) {
//         setPageNumber((prevPage) => prevPage - 1);
//       }
//     }}
//   >
//     Prev
//   </button>

//   <p className="count">{pageNumber}</p>

//   <button
//     type="button"
//     onClick={() => setPageNumber((prevPage) => prevPage + 1)}
//     className="next"
//   >
//     Next
//   </button>
// </div>
//             </div>
//           </div>
//         ) : (
//           <div className="result_box">
//             {loading ? (
//               <Loader />
//             ) : (
//               <div>
//                 {trails.map((trail, ind) => (
//                   <div key={ind} className="trail_card my-4 border p-4">
//                     <span className="featuredabsolute">Featured</span>
//                     <div className="title_status flex justify-between">
//                       <Link
//                         href={`/${trail.nct_id}/${trail["Trial Name"]["Brief Title"]}`}
//                       >
//                         <h4
//                           className="trail_title"
//                           style={{
//                             cursor: "pointer",
//                           }}
//                         >
//                           {String(
//                             trail["Trial Name"]["Brief Title"] || "No Title"
//                           )}
//                         </h4>
//                       </Link>
//                       <div className="status_card">
//                         <span>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="12"
//                             height="12"
//                             fill="none"
//                             viewBox="0 0 16 16"
//                           >
//                             <path
//                               stroke="currentColor"
//                               d="M2.359 11.638 1.5 14.5h13l-.859-2.862A3 3 0 0 0 10.768 9.5H5.232a3 3 0 0 0-2.873 2.138Z"
//                             />
//                             <circle
//                               cx="8"
//                               cy="4.5"
//                               r="3"
//                               stroke="currentColor"
//                             />
//                           </svg>
//                         </span>
//                         <p>{trail["Study Status"]["Overall Status"]}</p>
//                       </div>
//                     </div>
//                     <p className="trailsdescription">
//                       {trail["Basic Information"]["Description"].substring(
//                         0,
//                         200
//                       )}
//                     </p>

//                     <div className="additional_info">
//                       <div></div>
//                       <div>
//                         <button
//                           id="bottone1"
//                           style={{
//                             color: "#1a73e8",
//                             fontSize: "14px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           Read more
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="pagination">
//                   <button
//                     type="button"
//                     className="prev"
//                     onClick={() => {
//                       if (pageNumber > 1) {
//                         setPageNumber((prevPage) => prevPage - 1);
//                       }
//                     }}
//                   >
//                     Prev
//                   </button>

//                   <p className="count">{pageNumber}</p>

//                   <button
//                     type="button"
//                     onClick={() => setPageNumber((prevPage) => prevPage + 1)}
//                     className="next"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
