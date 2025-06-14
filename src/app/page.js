"use client";
import react, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import GradientGenerator from "./module/GradientGenerator";
import GridGenerator from "./module/GridGenerator";
import TextGradient from "./module/TextGradient";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const menu = searchParams.get("menu");

    if (menu) {
      setActiveMenu(menu);
    } else {
      setActiveMenu("gradient");
    }
  }, [router]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    router.push(`?menu=${menu}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-black">
      <Navbar activeMenu={activeMenu} handleMenuClick={handleMenuClick} />
      <div className="container mx-auto relative pt-28">
        <AnimatePresence>
          {activeMenu === "gradient" ? (
            <motion.div
              key="gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <GradientGenerator />
            </motion.div>
          ) : activeMenu === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <GridGenerator />
            </motion.div>
          ) : activeMenu === "text" ? (
            <motion.div
              key="text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <TextGradient />
            </motion.div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <Loader />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="loader">
      <div className="cell d-0"></div>
      <div className="cell d-1"></div>
      <div className="cell d-2"></div>

      <div className="cell d-1"></div>
      <div className="cell d-2"></div>

      <div className="cell d-2"></div>
      <div className="cell d-3"></div>

      <div className="cell d-3"></div>
      <div className="cell d-4"></div>
    </div>
  );
}
