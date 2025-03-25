"use client";

import Search from "@/components/search/search";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ListingRootLayout({ children }) {
  const pathname = usePathname();

  // Skip layout for the search route
  if (pathname.startsWith("/clinical-trials/listings/search") || pathname.startsWith("/clinical-trials/listings/NCT")) {
    return <>{children}</>;
  }
  return (
    <>
    <section className="A-Z_filtering">
    <Search />
      <div className="flex gap-2 w-[100%] flex_wrap_miss">
        <div className="flex flex-col gap-2 browse_by_section">
          <strong>Browse by:</strong> 
          <Link href={`/clinical-trials/listings`}>
            <button type="button" style={{}}>Medical Condition</button>
          </Link>
          <Link href={`/clinical-trials/listings/location`}>
            <button type="button">Location</button>
          </Link>
        </div>
        {children}
      </div>
    </section>
      
    </>
  );
}
