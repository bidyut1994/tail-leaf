import React, { useState } from "react";
import { cssColor } from "../module/CssColor";
import { colorOptions } from "../module/colorOption";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const directions = [
  { label: "To Right", value: "to-r" },
  { label: "To Left", value: "to-l" },
  { label: "To Top", value: "to-t" },
  { label: "To Bottom", value: "to-b" },
  { label: "To Top Right", value: "to-tr" },
  { label: "To Top Left", value: "to-tl" },
  { label: "To Bottom Right", value: "to-br" },
  { label: "To Bottom Left", value: "to-bl" },
];

function getRandomColor() {
  return colorOptions[Math.floor(Math.random() * colorOptions.length)];
}

export default function GradientGenerator() {
  const [direction, setDirection] = useState("to-r");
  const [from, setFrom] = useState("blue-500");
  const [via, setVia] = useState("purple-500");
  const [to, setTo] = useState("pink-500");
  const [useVia, setUseVia] = useState(true);
  const [tailwindCopied, setTailwindCopied] = useState(false);
  const [cssCopied, setCssCopied] = useState(false);

  const gradientClass = `bg-gradient-to-${direction.replace(
    "to-",
    ""
  )} from-${from} ${useVia ? `via-${via}` : ""} to-${to}`.trim();
  const tailwindClass = `bg-gradient-to-${direction.replace(
    "to-",
    ""
  )} from-${from}${useVia ? ` via-${via}` : ""} to-${to}`;

  const cssGradient = `linear-gradient(${directionToCss(direction)}, ${cssColor(
    from
  )}${useVia ? `, ${cssColor(via)}` : ""}, ${cssColor(to)})`;

  function shuffleGradient() {
    setFrom(getRandomColor());
    setVia(getRandomColor());
    setTo(getRandomColor());
  }

  const handleTailwindCopy = () => {
    navigator.clipboard.writeText(tailwindClass);
    setTailwindCopied(true);
    setTimeout(() => setTailwindCopied(false), 2000);
  };

  const handleCssCopy = () => {
    navigator.clipboard.writeText(`background: ${cssGradient};`);
    setCssCopied(true);
    setTimeout(() => setCssCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center py-8">
      <div className="flex justify-center items-center w-full mb-8">
        <Button
          onClick={shuffleGradient}
          size="xl"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
        >
          Generate Gradient
        </Button>
      </div>
      <div className={`rounded-xl p-6 w-full max-w-5xl`}>
        <div className="flex flex-wrap  gap-4 items-center mb-6   ">
          <div className="flex items-center text-stone-600 gap-2 mt-3 mr-7">
            <span>Add Via Color</span>
            <Switch checked={useVia} onCheckedChange={setUseVia} />
          </div>
          <div className="flex flex-col  ">
            <label className="text-xs text-stone-600">Direction</label>
            <Select value={direction} onValueChange={setDirection}>
              <SelectTrigger className="w-32">
                {directions.find((d) => d.value === direction)?.label}
              </SelectTrigger>
              <SelectContent>
                {directions.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col ">
            <label className="text-xs text-stone-600">From Color</label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="w-32">from-{from}</SelectTrigger>
              <SelectContent>
                {colorOptions.map((c) => (
                  <SelectItem key={c} value={c}>
                    from-{c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {useVia && (
            <div className="flex flex-col  ">
              <label className="text-xs text-stone-600">Via Color</label>
              <Select value={via} onValueChange={setVia}>
                <SelectTrigger className="w-32">via-{via}</SelectTrigger>
                <SelectContent>
                  {colorOptions.map((c) => (
                    <SelectItem key={c} value={c}>
                      via-{c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex flex-col ">
            <label className="text-xs text-stone-600">To Color</label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="w-32">to-{to}</SelectTrigger>
              <SelectContent>
                {colorOptions.map((c) => (
                  <SelectItem key={c} value={c}>
                    to-{c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* <div className="rounded-lg" style={{ minHeight: 220 }}>
          <div className={`w-full   rounded-lg ${gradientClass}`}></div>
        </div> */}
        <div
          className="mt-4 text-center shadow-lg border border-zinc-700 text-zinc-400 text-sm rounded-lg flex justify-center items-center"
          style={{
            background: cssGradient,
            minHeight: 400,
          }}
        >
          <div>
            <div className="flex items-center gap-2 justify-center">
              <span className="font-mono bg-zinc-900 px-2 py-1 rounded">
                {tailwindClass}
              </span>
              <button
                onClick={handleTailwindCopy}
                className="p-1 hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                title="Copy Tailwind class"
              >
                {tailwindCopied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-zinc-400"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                )}
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2 justify-center">
              <span className="font-mono bg-zinc-900 px-2 py-1 rounded block whitespace-pre-wrap">
                background: {cssGradient};
              </span>
              <button
                onClick={handleCssCopy}
                className="p-1 hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                title="Copy CSS gradient"
              >
                {cssCopied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-zinc-400"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions for CSS gradient
function directionToCss(dir) {
  switch (dir) {
    case "to-r":
      return "to right";
    case "to-l":
      return "to left";
    case "to-t":
      return "to top";
    case "to-b":
      return "to bottom";
    case "to-tr":
      return "to top right";
    case "to-tl":
      return "to top left";
    case "to-br":
      return "to bottom right";
    case "to-bl":
      return "to bottom left";
    default:
      return "to right";
  }
}
