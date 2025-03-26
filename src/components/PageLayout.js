"use client";
import { usePathname } from "next/navigation";
import Footer from "./footer/footer";
import ChatWindow from "./chatwindow/chatwindow";

export default function PageLayout({ children }) {
  const pathname = usePathname();

  console.log("Current pathname:", pathname); // Debugging

  // Corrected paths (no trailing slash)
  const hideFooterRoutes = ["/decentrialzAI"];
  const hideChatRoutes = ["/decentrialzAI"];

  // Use `.startsWith()` to match subpages as well
  const hideFooter = hideFooterRoutes.some(route => pathname.startsWith(route));
  const hideChat = hideChatRoutes.some(route => pathname.startsWith(route));

  return (
    <>
      {children}
      {!hideChat && <ChatWindow />}
      {!hideFooter && <Footer />}
    </>
  );
}
