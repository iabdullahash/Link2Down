import React from "react";
import Topbar from "./topbar";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

function Layout({ children }) {
  return (
    <>
      <Topbar  />
      <main
        className={`${inter.variable}  font-sans overflow-x-hidden  h-screen w-screen px-4 lg:px-40 2xl:px-96 2xl:py-32 py-24 bg-bg `}
      >
        {...children}
      </main>
    </>
  );
}

export default Layout;
