"use client";
import { usePathname } from "next/navigation";
import Footer from "./footer/footer";
import ChatWindow from "./chatwindow/chatwindow";
import Header from "./Header/header";

export default function PageLayout({ children }) {
  const pathname = usePathname();

  console.log("Current pathname:", pathname); // Debugging

  // Corrected paths (no trailing slash)
  const hideFooterRoutes = ["/decentrialzAI"];
  const hideChatRoutes = ["/decentrialzAI"];
  const hideHeaderRoutes = ["/decentrialzAI"];

  // Use `.startsWith()` to match subpages as well
  const hideFooter = hideFooterRoutes.some(route => pathname.startsWith(route));
  const hideChat = hideChatRoutes.some(route => pathname.startsWith(route));
  const hideHeader = hideHeaderRoutes.some(route => pathname.startsWith(route));

  return (
    <>
    {!hideHeader && <Header />}
      {children}
      {!hideChat && <ChatWindow />}
      {!hideFooter && <Footer />}
      
    </>
  );
}
