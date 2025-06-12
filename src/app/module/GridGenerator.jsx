import React, { useState } from "react";
import { Rnd } from "react-rnd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { IoResizeSharp } from "react-icons/io5";

import { IoMdAdd } from "react-icons/io";

function getDefaultItems() {
  return [
    { id: 1, colStart: 1, rowStart: 1, width: 1, height: 1, content: "1" },
  ];
}

export default function GridGenerator() {
  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(3);
  const [gap, setGap] = useState(4);
  const [items, setItems] = useState(getDefaultItems());
  const [nextId, setNextId] = useState(2);
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState("jsx");

  const gridClass = `grid grid-cols-${columns} grid-rows-${rows} gap-${gap}`;

  function addItem(colStart = 1, rowStart = 1) {
    setItems([
      ...items,
      {
        id: nextId,
        colStart,
        rowStart,
        width: 1,
        height: 1,
        content: nextId.toString(),
      },
    ]);
    setNextId(nextId + 1);
  }

  function removeItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function moveItem(id, colStart, rowStart) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, colStart, rowStart } : item
      )
    );
  }

  function resizeItem(id, width, height) {
    setItems(
      items.map((item) => (item.id === id ? { ...item, width, height } : item))
    );
  }

  function resetGrid() {
    setItems(getDefaultItems());
    setColumns(5);
    setRows(3);
    setGap(4);
    setNextId(2);
  }

  function handleCopy() {
    const code =
      format === "jsx"
        ? `<div className=\"${gridClass}\">\n${items
            .map(
              (item) =>
                `  <div className=\"col-start-${item.colStart} row-start-${item.rowStart} col-span-${item.width} row-span-${item.height}\">${item.content}</div>`
            )
            .join("\n")}\n</div>`
        : `<div class=\"${gridClass}\">\n${items
            .map(
              (item) =>
                `  <div class=\"col-start-${item.colStart} row-start-${item.rowStart} col-span-${item.width} row-span-${item.height}\">${item.content}</div>`
            )
            .join("\n")}\n</div>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  // Build a 2D array for the grid
  const gridCells = Array.from({ length: rows }, (_, rowIdx) =>
    Array.from({ length: columns }, (_, colIdx) => {
      const cellCol = colIdx + 1;
      const cellRow = rowIdx + 1;
      const item = items.find(
        (it) => it.colStart === cellCol && it.rowStart === cellRow
      );
      return { col: cellCol, row: cellRow, item };
    })
  );

  // For react-rnd, calculate cell size
  const cellWidth = 150; // px
  const cellHeight = 80; // px
  const gapPx = gap * 4; // Tailwind gap-4 = 1rem = 16px, so gap*4 px

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-24   text-white">
      <div className="rounded-xl p-6 w-full max-w-6xl ">
        <div className="flex gap-6 items-center mb-4 pb-3 border-zinc-200 text-emerald-400 border-b  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-emerald-400"
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
          <p className=" text-xl font-bold  ">Generate Tailwind CSS Grid</p>
        </div>
        <div className="flex justify-between items-center pb-4 border-b ">
          <div className="flex gap-6   text-white">
            <div>
              <label className="text-xs  ">Columns</label>
              <Select
                value={columns.toString()}
                onValueChange={(val) => setColumns(Number(val))}
              >
                <SelectTrigger className="  w-20 bg-white text-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(12)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs  ">Rows</label>
              <Select
                value={rows.toString()}
                onValueChange={(val) => setRows(Number(val))}
              >
                <SelectTrigger className=" w-20 bg-white text-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(12)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs  ">Gap</label>
              <Select
                value={gap.toString()}
                onValueChange={(val) => setGap(Number(val))}
              >
                <SelectTrigger className=" w-20 bg-white text-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(12)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className=" ">
            <button
              onClick={resetGrid}
              className=" px-4 py-1 bg-emerald-500 rounded text-white cursor-pointer hover:opacity-80"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="mt-10">
          <div
            className="relative"
            style={{
              width: columns * cellWidth + (columns - 1) * gapPx,
              height: rows * cellHeight + (rows - 1) * gapPx,
              background: "#17223b",
              borderRadius: 5,
              border: "1px solid #334155",
              padding: "10px",
              margin: "0 auto",
            }}
          >
            {items.map((item) => (
              <Rnd
                key={item.id}
                size={{
                  width: item.width * cellWidth + (item.width - 1) * gapPx,
                  height: item.height * cellHeight + (item.height - 1) * gapPx,
                }}
                position={{
                  x: (item.colStart - 1) * (cellWidth + gapPx),
                  y: (item.rowStart - 1) * (cellHeight + gapPx),
                }}
                minWidth={cellWidth}
                minHeight={cellHeight}
                maxWidth={columns * cellWidth + (columns - 1) * gapPx}
                maxHeight={rows * cellHeight + (rows - 1) * gapPx}
                bounds="parent"
                onDragStop={(e, d) => {
                  const newCol = Math.round(d.x / (cellWidth + gapPx)) + 1;
                  const newRow = Math.round(d.y / (cellHeight + gapPx)) + 1;
                  moveItem(
                    item.id,
                    Math.max(1, Math.min(newCol, columns)),
                    Math.max(1, Math.min(newRow, rows))
                  );
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  const newWidth = Math.round(
                    ref.offsetWidth / (cellWidth + gapPx)
                  );
                  const newHeight = Math.round(
                    ref.offsetHeight / (cellHeight + gapPx)
                  );
                  const maxWidth = columns - item.colStart + 1;
                  const maxHeight = rows - item.rowStart + 1;
                  const finalWidth = Math.max(1, Math.min(newWidth, maxWidth));
                  const finalHeight = Math.max(
                    1,
                    Math.min(newHeight, maxHeight)
                  );
                  const newArea = [];
                  for (
                    let r = item.rowStart;
                    r < item.rowStart + finalHeight;
                    r++
                  ) {
                    for (
                      let c = item.colStart;
                      c < item.colStart + finalWidth;
                      c++
                    ) {
                      newArea.push(`${r},${c}`);
                    }
                  }
                  const overlaps = items.some((other) => {
                    if (other.id === item.id) return false;
                    for (
                      let r = other.rowStart;
                      r < other.rowStart + (other.height || 1);
                      r++
                    ) {
                      for (
                        let c = other.colStart;
                        c < other.colStart + (other.width || 1);
                        c++
                      ) {
                        if (newArea.includes(`${r},${c}`)) return true;
                      }
                    }
                    return false;
                  });
                  if (!overlaps) {
                    resizeItem(item.id, finalWidth, finalHeight);
                  }
                }}
                dragGrid={[cellWidth + gapPx / 2, cellHeight + gapPx / 2]}
                resizeGrid={[cellWidth + gapPx / 2, cellHeight + gapPx / 2]}
                enableResizing={{ bottomRight: true }}
                className="z-20 absolute bg-slate-800 border-2 border-emerald-400 rounded-md text-white flex items-center justify-center font-bold text-lg shadow-md p-1"
              >
                <div className="w-full h-full relative">
                  {item.content}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="hover:opacity-80 absolute top-1 right-1 bg-red-500 rounded-full p-1 cursor-pointer flex items-center justify-center"
                  >
                    <IoMdClose className="text-white" size={10} />
                  </button>
                  <IoResizeSharp
                    className="absolute cursor-pointer -bottom-1 -right-1 text-emerald-400 transform rotate-90 opacity-50"
                    size={20}
                  />
                </div>
              </Rnd>
            ))}
            {gridCells.flat().map((cell) => {
              if (
                items.some(
                  (item) =>
                    cell.col >= item.colStart &&
                    cell.col < item.colStart + (item.width || 1) &&
                    cell.row >= item.rowStart &&
                    cell.row < item.rowStart + (item.height || 1)
                )
              ) {
                return null;
              }
              return (
                <button
                  key={`add-${cell.col}-${cell.row}`}
                  onClick={() => addItem(cell.col, cell.row)}
                  className="absolute z-10 flex items-center justify-center hover:opacity-80 bg-slate-700 border border-dashed border-emerald-400 rounded-lg text-emerald-400 text-2xl cursor-pointer"
                  style={{
                    left: (cell.col - 1) * (cellWidth + gapPx),
                    top: (cell.row - 1) * (cellHeight + gapPx),
                    width: cellWidth,
                    height: cellHeight,
                  }}
                  title="Add item"
                >
                  <IoMdAdd size={20} />
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-12 bg-[#1e293b] rounded-lg p-4">
          <div className="flex items-center mb-2 gap-4 justify-between">
            <div className="flex items-center gap-4">
              <p className="text-emerald-400 font-bold mr-5">Generated Code:</p>
              <RadioGroup
                value={format}
                onValueChange={setFormat}
                className="flex flex-row gap-5 cursor-pointer"
              >
                <label className="flex items-center gap-1 cursor-pointer">
                  <RadioGroupItem
                    value="jsx"
                    id="jsx-radio"
                    className="cursor-pointer"
                  />{" "}
                  JSX
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <RadioGroupItem
                    value="html"
                    id="html-radio"
                    className="cursor-pointer"
                  />{" "}
                  HTML
                </label>
              </RadioGroup>
            </div>
            <button
              onClick={handleCopy}
              className={`ml-2 px-3 py-1 cursor-pointer rounded hover:opacity-80 ${
                copied ? "bg-emerald-700" : "bg-emerald-500"
              } text-white`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto text-sm text-emerald-200 p-5 bg-slate-600 rounded-md mt-4">
            {format === "jsx"
              ? `<div className="${gridClass}">
${items
  .map(
    (item) =>
      `  <div className="col-start-${item.colStart} row-start-${item.rowStart} col-span-${item.width} row-span-${item.height}">${item.content}</div>`
  )
  .join("\n")}
</div>`
              : `<div class="${gridClass}">
${items
  .map(
    (item) =>
      `  <div class="col-start-${item.colStart} row-start-${item.rowStart} col-span-${item.width} row-span-${item.height}">${item.content}</div>`
  )
  .join("\n")}
</div>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
