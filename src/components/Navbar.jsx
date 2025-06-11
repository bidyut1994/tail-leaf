"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const gradients = [
  {
    title: "Generate Gradient",
    description: "Create beautiful background CSS gradient ",
    key: "gradient",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-emerald-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Generate Grid",
    description: "Create custom grid patterns and layouts",
    key: "grid",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-emerald-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
];

export default function Navbar({ activeMenu, handleMenuClick }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? // ? "backdrop-blur-lg bg-green/80 border-b border-green-200/50 shadow-sm bg-green-50"
            "backdrop-blur-lg bg-green/80 "
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Image src="/assets/icon.png" alt="logo" width={32} height={32} />
            <Link
              href="/"
              className={`text-2xl ml-5 font-bold transition-colors ${
                isScrolled ? "text-green-700" : "text-green-500"
              } hover:text-green-700`}
            >
              Tail Leaf
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl   mx-auto px-4 sm:px-6 lg:px-8 flex   items-center gap-3 border-b-[.5px] border-gray-700  pb-3">
        {gradients.map((gradient) => (
          <div
            key={gradient.key}
            onClick={() => handleMenuClick(gradient.key)}
            className={`cursor-pointer border-[.5px] border-emerald-100 group  py-1 px-4 rounded-full ${
              activeMenu === gradient.key
                ? "border-emerald-400 text-emerald-400 bg-gradient-to-tl from-emerald-200 to-emerald-300"
                : "text-white"
            } hover:bg-gradient-to-tl from-emerald-100 to-emerald-200 `}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center text-emerald-700">
                {gradient.icon}
              </div>
              <div>
                <p
                  className={`${
                    activeMenu === gradient.key
                      ? "text-emerald-700"
                      : "text-white"
                  } text-md font-bold group-hover:text-emerald-700`}
                >
                  {gradient.title}
                </p>{" "}
                {/* <p className="text-xs   text-emerald-700">
                {gradient.description}
              </p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
