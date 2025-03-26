
import type { Metadata } from "next";
import "./globals.css"; // Importing global styles
import Header from "../components/Header/header";
import ChatWindow from '../components/chatwindow/chatwindow';
import PageLayout from "../components/PageLayout";



export const metadata: Metadata = {
  title: "Decentrialz",
  description: "Research clinical trails by Decentrialz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico.png" type="image/png" sizes="32x32" />
      <body className="your-custom-class">
        <Header />
        <PageLayout>{children}</PageLayout>       
      </body>
    </html>
  );
}
