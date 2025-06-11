import React from "react";

const gradients = [
  {
    title: "Generate Gradient",
    description: "Create beautiful gradient effects for your designs",
    key: "gradient",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-emerald-400"
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
        className="h-6 w-6 text-emerald-400"
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

export default function MenuBar({ activeMenu, handleMenuClick }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex   items-center gap-4">
      {gradients.map((gradient) => (
        <div
          key={gradient.key}
          onClick={() => handleMenuClick(gradient.key)}
          className={`cursor-pointer ${
            activeMenu === gradient.key ? "text-emerald-400" : "text-white"
          } hover:text-emerald-400`}
        >
          <div className="flex items-center gap-2">
            {gradient.icon}
            <span className="text-white">{gradient.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
