import React from "react";

export default function GridGenerator() {
  return (
    <div>
      {" "}
      <div className="min-h-screen  flex flex-col items-center pt-8 pb-24  ">
        <div className="rounded-xl p-6 w-full max-w-5xl ">
          <div className="flex gap-3 items-center mb-5 pb-3 border-zinc-200 text-emerald-400 border-b">
            {/* <BiFullscreen size="44" /> */}
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
          <div></div>
        </div>
      </div>
    </div>
  );
}
