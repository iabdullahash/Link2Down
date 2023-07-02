import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Hamburger from "./ham";
import Link from "next/link";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

function Topbar() {
  const [textmode, setTMode] = useState("text-yt");
  const [page, setPage] = useState("home");
  const [bgmode, setBMode] = useState("bg-yt");
  const router = useRouter();
  console.log(router);
  const currentPath = router.route;
  useEffect(() => {
    if (currentPath) {
      setPage(currentPath);
      if (currentPath == "/youtube") {
        setBMode("bg-yt");
        setTMode("text-yt");
      } else if (currentPath == "/instagram") {
        setBMode("bg-insta");
        setTMode("text-insta");
      } else if (currentPath == "/linkedin") {
        setBMode("bg-lin");
        setTMode("text-lin");
      } else if (currentPath == "/twitter") {
        setBMode("bg-tw");
        setTMode("text-tw");
      }
    }
  }, [currentPath]);
  console.log(page);

  const [menuState, setmenuState] = useState(false);
  return (
    <div
      className={`${inter.variable}  font-sans flex flex-row w-screen items-center  h-14  2xl:h-20 ${bgmode} justify-between  fixed px-4 lg:px-40 2xl:px-96 z-50`}
    >
      <div
        className="
        text-lg 2xl:text-3xl
      font-black text-bg"
      >
        Link2Down
      </div>
      <div className="lg:hidden block">
        <Hamburger isOpen={menuState} setIsOpen={setmenuState} />

        <div
          className={`fixed top-14  ${
            menuState ? "left-0" : "left-full"
          } duration-300 transition-all ${bgmode} w-screen h-screen px-10 justify-center items-center flex flex-col gap-6 `}
        >
          <Link
            className={` cursor-pointer font-medium duration-150 text-center w-full py-2 ${
              page == "/home" || page == "/"
                ? `bg-bg ${textmode}`
                : "hover:text-gray-300 text-bg "
            }`}
            href={"/"}
          >
            <div>Home</div>
          </Link>
          <Link
            className={` cursor-pointer font-medium duration-150 text-center w-full py-2 ${
              page == "/youtube"
                ? `bg-bg ${textmode}`
                : "hover:text-gray-300 text-bg "
            }`}
            href={"/youtube"}
          >
            <div>Youtube</div>
          </Link>
          <Link
            className={` cursor-pointer font-medium duration-150 text-center w-full py-2 ${
              page == "/instagram"
                ? `bg-bg ${textmode}`
                : "hover:text-gray-300 text-bg"
            }`}
            href={"/instagram"}
          >
            <div>Instagram</div>
          </Link>
          <Link
            className={` cursor-pointer font-medium duration-150 text-center w-full py-2 ${
              page == "lin"
                ? `bg-bg ${textmode}`
                : "hover:text-gray-300 text-bg"
            }`}
            href={"/linkedin"}
          >
            <div>LinkedIn</div>
          </Link>
          <Link
            className={` cursor-pointer font-medium duration-150 text-center w-full py-2 ${
              page == "twitter    "
                ? `bg-bg ${textmode}`
                : "hover:text-gray-300 text-bg"
            }`}
            href={"/twitter"}
          >
            <div>Twitter</div>
          </Link>
        </div>
      </div>

      <div className="hidden flex-row 2xl:gap-12 items-center lg:flex  justify-center text-sm 2xl:text-2xl ">
        <Link href={"/"}>
          <div
            className={` cursor-pointer font-medium duration-150 x px-8 h-14 text-center items-center justify-center flex 2xl:h-[84px] ${
              page == "/home" || page == "/"
                ? `bg-bg ${textmode}`
                : "hover:text-gray-300 text-bg "
            }`}
          >
            Home
          </div>
        </Link>
        <Link href={"/youtube"}>
          <div
            className={` cursor-pointer font-medium duration-150 x px-8 h-14 text-center items-center justify-center flex 2xl:h-[84px] ${
              page == "/youtube"
                ? `bg-bg ${textmode}`
                : "hover:text-gray-300 text-bg "
            }`}
          >
            Youtube
          </div>
        </Link>
        <Link href={"/instagram"}>
          <div
            className={` cursor-pointer font-medium duration-150 x px-8 h-14 text-center items-center justify-center flex 2xl:h-[84px] ${
              page == "/instagram"
                ? `bg-bg ${textmode}`
                : "hover:text-gray-300 text-bg"
            }`}
          >
            Instagram
          </div>
        </Link>
        <Link href={"/linkedin"}>
          <div
            className={` cursor-pointer font-medium duration-150 x px-8 h-14 text-center items-center justify-center flex 2xl:h-[84px] ${
              page == "/linkedin"
                ? `bg-bg ${textmode}`
                : "hover:text-gray-300 text-bg"
            }`}
          >
            LinkedIn
          </div>
        </Link>
        <Link href={"/twitter"}>
          <div
            className={` cursor-pointer font-medium duration-150 x px-8 h-14 text-center items-center justify-center flex 2xl:h-[84px] ${
              page == "/twitter"
                ? `bg-bg ${textmode}`
                : "hover:text-gray-300 text-bg"
            }`}
          >
            Twitter
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
