import Search from "@/components/search/search";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="your-custom-class">
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
      </body>
    </html>
  );
}
