"use client"; 

import { usePathname } from "next/navigation";
import Footer from "./footer/footer";

export default function PageLayout({ children }) {
  const pathname = usePathname();

  
  const hideFooterRoutes = ["/decentrialsgpt/"];

  return (
    <>
      {children}
      {!hideFooterRoutes.includes(pathname) && <Footer />}
    </>
  );
}
