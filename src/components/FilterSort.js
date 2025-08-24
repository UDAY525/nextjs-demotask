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
        className="p-2 border rounded "
      >
        <option className="text-black" value="all">
          All Categories
        </option>
        {categories.map((c) => (
          <option className="text-black capitalize" key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="p-2 border rounded"
      >
        <option className="text-black" value="default">
          Sort
        </option>
        <option className="text-black" value="asc">
          Price: Low → High
        </option>
        <option className="text-black" value="desc">
          Price: High → Low
        </option>
      </select>
    </div>
  );
}
