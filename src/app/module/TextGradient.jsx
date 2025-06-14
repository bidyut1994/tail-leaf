import React, { useState } from "react";
import { cssColor } from "./TailwindColors";
import { colorOptions } from "./TailwindColors";
import { BiFullscreen } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { IoText } from "react-icons/io5";

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
  const value = colorOptions[Math.floor(Math.random() * colorOptions.length)];

  return value;
}
export default function TextGradient() {
  const [direction, setDirection] = useState("to-r");
  const [from, setFrom] = useState({ color: "blue-500", code: "#3b82f6" });
  const [via, setVia] = useState({ color: "purple-500", code: "#a855f7" });
  const [to, setTo] = useState({ color: "pink-500", code: "#ec4899" });
  const [useVia, setUseVia] = useState(true);
  const [tailwindCopied, setTailwindCopied] = useState(false);
  const [cssCopied, setCssCopied] = useState(false);

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
    navigator.clipboard.writeText(cssGradient);
    setCssCopied(true);
    setTimeout(() => setCssCopied(false), 2000);
  };

  // Build the linear-gradient Tailwind class for text
  const tailwindClass = `bg-gradient-to-${direction.replace("to-", "")} from-${
    from.color
  }${useVia ? ` via-${via.color}` : ""} to-${
    to.color
  } text-transparent bg-clip-text`;
  const textGradient = `linear-gradient(${directionToCss(
    direction
  )}, ${cssColor(from.color)}${
    useVia ? `, ${cssColor(via.color)}` : ""
  }, ${cssColor(to.color)})`;

  return (
    <div>
      {" "}
      <div className="min-h-screen  flex flex-col items-center pt-8 pb-24  ">
        <div className="rounded-xl p-6 w-full max-w-6xl ">
          <div className="flex gap-3 items-center mb-5 text-emerald-400">
            <IoText size="40" className="border rounded-md p-1" />

            <p className=" text-xl font-bold  ">
              Generate Tailwind CSS Text Gradients
            </p>
          </div>

          <div className="flex justify-between items-center border-b border-t border-zinc-200 py-3">
            <div className="flex flex-wrap  gap-3 items-center   ">
              <div className="flex items-center text-white gap-2 mt-3 mr-5">
                <span className="text-sm">Add Via Color</span>
                <Switch checked={useVia} onCheckedChange={setUseVia} />
              </div>
              <div className="flex flex-col  ">
                <label className="text-xs text-white">Direction</label>
                <Select value={direction} onValueChange={setDirection}>
                  <SelectTrigger className="w-32 text-white">
                    {directions.find((d) => d.value === direction)?.label}
                  </SelectTrigger>
                  <SelectContent>
                    {directions.map((d) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={d.value}
                        value={d.value}
                      >
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col ">
                <label className="text-xs text-white">From Color</label>
                <Select
                  value={from?.color}
                  onValueChange={(value) => {
                    const selectedColor = colorOptions.find(
                      (c) => c.color === value
                    );
                    setFrom(selectedColor);
                  }}
                >
                  <SelectTrigger className="w-32 text-white">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full relative top-[1.5px]`}
                        style={{ backgroundColor: from?.code }}
                      ></div>
                      from-{from?.color}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((c) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={c?.color}
                        value={c?.color}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full relative top-[1.5px]`}
                            style={{ backgroundColor: c?.code }}
                          ></div>
                          from-{c?.color}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {useVia && (
                <div className="flex flex-col  ">
                  <label className="text-xs text-white">Via Color</label>
                  <Select
                    value={via?.color}
                    onValueChange={(value) => {
                      const selectedColor = colorOptions.find(
                        (c) => c.color === value
                      );
                      setVia(selectedColor);
                    }}
                  >
                    <SelectTrigger className="w-32 text-white">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full relative top-[1.5px]`}
                          style={{ backgroundColor: via?.code }}
                        ></div>
                        via-{via?.color}
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((c) => (
                        <SelectItem
                          className="cursor-pointer"
                          key={c?.color}
                          value={c?.color}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full relative top-[1.5px]`}
                              style={{ backgroundColor: c?.code }}
                            ></div>
                            via-{c?.color}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex flex-col ">
                <label className="text-xs text-white">To Color</label>
                <Select
                  value={to?.color}
                  onValueChange={(value) => {
                    const selectedColor = colorOptions.find(
                      (c) => c.color === value
                    );
                    setTo(selectedColor);
                  }}
                >
                  <SelectTrigger className="w-32 text-white">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full relative top-[1.5px]`}
                        style={{ backgroundColor: to?.code }}
                      ></div>
                      to-{to?.color}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((c) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={c?.color}
                        value={c?.color}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full`}
                            style={{ backgroundColor: c?.code }}
                          ></div>
                          to-{c?.color}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>{" "}
            </div>{" "}
            <div className=" relative top-2">
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <Button
                    onClick={() => shuffleGradient()}
                    className="cursor-pointer py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    size="sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-clockwise"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                      />
                      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs p-1">Shuffle Gradient</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div
            className="mt-4 text-center shadow-lg    text-sm rounded-lg flex flex-col justify-center items-center"
            style={{ minHeight: 400 }}
          >
            <div className="flex flex-col items-center w-full">
              {tailwindClass && (
                <span
                  className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text"
                  //   className={tailwindClass + " text-6xl font-extrabold mb-8"}
                >
                  Tailwind CSS Text Gradients
                </span>
              )}
              <div className="flex items-center gap-2 justify-center mt-10">
                <span className="font-mono bg-zinc-900 px-2 py-1 rounded max-w-2xl">
                  {tailwindClass}
                </span>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      onClick={handleTailwindCopy}
                      className="p-1 bg-zinc-800 rounded transition-colors cursor-pointer"
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
                          <rect
                            width="14"
                            height="14"
                            x="8"
                            y="8"
                            rx="2"
                            ry="2"
                          />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-xs">Copy Tailwind class</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
