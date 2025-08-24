"use client";
import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="flex-1 p-2 border rounded placeholder:text-sm"
      placeholder="Search products by title..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
