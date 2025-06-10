"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import SplitText from "@/components/SplitText";
import Threads from "@/components/Threads";

const gradients = [
  {
    title: "Generate Gradient",
    description: "Create beautiful gradient effects for your designs",
    href: "/gradients",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-emerald-600"
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
    href: "/grids",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-emerald-600"
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

export default function Home() {
  const handleAnimationComplete = () => {
    console.log("Animation completed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/50 to-white">
      <Navbar />
      <div className="container mx-auto relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "600px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Threads
              amplitude={1}
              distance={0}
              enableMouseInteraction={false}
              color={[1, 1, 1]}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-32 mb-16">
          <div className="text-center max-w-3xl">
            <SplitText
              text="Generate Tailwind CSS Gradients"
              className="text-5xl font-bold mb-6 mt-5 text-green-600 "
              // className="text-2xl font-semibold text-center"
              delay={100}
              duration={0.05}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <p className="text-lg text-green-600 leading-relaxed">
              A tool that helps you generate beautiful gradients and grids for
              your Tailwind CSS projects. Create stunning visual effects with
              just a few clicks. Customize colors, directions, and patterns to
              match your design needs.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 mb-20">
          {gradients.map((gradient, index) => (
            <Link
              key={index}
              href={gradient.href}
              className="group transform transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative w-48 h-48 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 p-[2px] overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full w-full rounded-2xl bg-white flex flex-col items-center p-6 text-center">
                  <div className="w-12 h-12 mb-4 rounded-full bg-emerald-100 flex items-center justify-center mt-4 group-hover:scale-110 transition-transform duration-300">
                    {gradient.icon}
                  </div>
                  <h3 className="text-md font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                    {gradient.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
