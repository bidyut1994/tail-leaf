import React, { useState } from "react";
import { cssColor } from "./CssColor";
import { colorOptions } from "./colorOption";
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
  const list = colorOptions.map((c) => c.color);
  if (list?.length > 0) {
    return list[Math.floor(Math.random() * list.length)];
  }
  return "blue-500";
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
    <div className="min-h-screen  flex flex-col items-center pt-8 pb-24   bg-[#222222]">
      <div className="rounded-xl p-6 w-full max-w-5xl ">
        <div className="flex gap-3 items-center mt-20 mb-5 text-emerald-600">
          <BiFullscreen size="44" />
          <p className=" text-3xl font-bold  ">
            Generate Tailwind CSS Background Gradients
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
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger className="w-32 text-white">
                  from-{from}
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
                <Select value={via} onValueChange={setVia}>
                  <SelectTrigger className="w-32 text-white">
                    via-{via}
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
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger className="w-32 text-white">
                  to-{to}
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
                      fill-rule="evenodd"
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

        {/* <div className="rounded-lg" style={{ minHeight: 220 }}>
          <div className={`w-full   rounded-lg ${gradientClass}`}></div>
        </div> */}
        <div
          className="mt-4 text-center shadow-lg  text-zinc-400 text-sm rounded-lg flex justify-center items-center"
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
              <Tooltip>
                <TooltipTrigger>
                  <button
                    onClick={handleTailwindCopy}
                    className="p-1  bg-zinc-800 rounded transition-colors cursor-pointer"
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
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs  ">Copy Tailwind class</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="mt-2 flex items-center gap-2 justify-center">
              <span className="font-mono bg-zinc-900 px-2 py-1 rounded block whitespace-pre-wrap">
                background: {cssGradient};
              </span>
              <Tooltip>
                <TooltipTrigger>
                  <button
                    onClick={handleCssCopy}
                    className="p-1  bg-zinc-800 rounded transition-colors cursor-pointer"
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
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs  ">Copy CSS gradient</p>
                </TooltipContent>
              </Tooltip>
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
