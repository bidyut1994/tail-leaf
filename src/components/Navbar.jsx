"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
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
    </nav>
  );
}
