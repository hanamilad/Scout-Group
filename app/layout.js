import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./_component/Nav";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "كشافين ج",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Nav />
      <Suspense fallback={<Loading />} >
      {children}
      </Suspense>
      </body>
    </html>
  );
}
