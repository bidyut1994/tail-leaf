"use client";
import react, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MenuBar from "@/components/MenuBar";
import GradientGenerator from "./module/GradientGenerator";
import GridGenerator from "./module/GridGenerator";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("gradient");
  const router = useRouter();

  useEffect(() => {
    router.push(`?menu="gradient"`);
  }, []);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    router.push(`?menu=${menu}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-black">
      <Navbar />
      <div className="container mx-auto relative">
        <div className="pt-20 mb-10">
          <MenuBar activeMenu={activeMenu} handleMenuClick={handleMenuClick} />
        </div>
        <AnimatePresence mode="wait">
          {activeMenu === "gradient" ? (
            <motion.div
              key="gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <GradientGenerator />
            </motion.div>
          ) : activeMenu === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <GridGenerator />
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
