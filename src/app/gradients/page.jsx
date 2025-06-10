"use client";
import React from "react";
import GradientGenerator from "./GradientGenerator";

export default function GradientPage() {
  return (
    <div className="mt-10 pt-20">
      <p className="text-center text-4xl font-bold my-5">
        Generate Tailwind CSS Background Gradients
      </p>
      <GradientGenerator />
    </div>
  );
}
