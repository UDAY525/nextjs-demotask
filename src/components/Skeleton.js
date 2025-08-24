"use client";
import React from "react";

export default function Skeleton() {
  return (
    <div className="p-3 border rounded flex flex-col gap-2">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-3/4"></div>
      <div className="skeleton h-4 w-1/2 mt-auto"></div>
    </div>
  );
}
