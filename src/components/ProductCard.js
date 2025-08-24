"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <article className="border rounded p-3 flex flex-col gap-2 hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 object-contain mx-auto"
        />
        <h3 className="text-sm font-medium mt-2 line-clamp-2">
          {product.title}
        </h3>
      </Link>
      <div className="mt-auto flex flex-col lg:flex-row items-center justify-between">
        <span className="font-bold">${product.price}</span>
        <span className="text-xs px-2 py-1 bg-slate-100 text-black capitalize dark:bg-slate-800 rounded">
          {product.category}
        </span>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="px-4 py-2 rounded bg-indigo-600 text-white"
      >
        Add to Cart
      </button>
    </article>
  );
}
