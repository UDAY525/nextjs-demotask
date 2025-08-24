"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import FilterSort from "../components/FilterSort";
import Skeleton from "../components/Skeleton";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
      const unique = Array.from(new Set(data.map((p) => p.category)));
      setCategories(unique);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let list = [...products];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (query.trim())
      list = list.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    setFiltered(list);
  }, [products, category, query, sort]);

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <SearchBar value={query} onChange={setQuery} />
        <FilterSort
          categories={categories}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded">
          <p className="text-red-700 dark:text-red-300">Error: {error}</p>
          <button
            onClick={fetchProducts}
            className="mt-2 px-3 py-1 rounded bg-red-600 text-white"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
