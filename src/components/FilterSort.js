"use client";
import React from "react";

export default function FilterSort({
  categories,
  category,
  setCategory,
  sort,
  setSort,
}) {
  return (
    <div className="flex gap-2">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="default">Sort</option>
        <option value="asc">Price: Low → High</option>
        <option value="desc">Price: High → Low</option>
      </select>
    </div>
  );
}
