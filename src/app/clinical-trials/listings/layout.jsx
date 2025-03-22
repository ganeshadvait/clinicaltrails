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
      <Search />
      <div className="flex ">
        <div className="flex flex-col gap-2">
          Browse by:
          <Link href={`/clinical-trials/listings`}>
            <button type="button">Medical Condition</button>
          </Link>
          <Link href={`/clinical-trials/listings/location`}>
            <button type="button">Location</button>
          </Link>
        </div>
        {children}
      </div>
    </>
  );
}
