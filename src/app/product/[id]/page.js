"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const router = useRouter();

  const addItemHandler = (product) => {
    toast.success("Added to cart!");
    addToCart(product);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed fetching product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || "Unknown");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
  }, []);

  if (loading) return <div className="skeleton h-60 w-full" />;
  if (error)
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded">
        <p className="text-red-700 dark:text-red-300">{error}</p>
        <button
          onClick={() => router.refresh()}
          className="mt-2 px-3 py-1 rounded bg-red-600 text-white"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-72 object-contain"
        />
      </div>
      <div className="md:col-span-2">
        <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
        <p className="text-xl font-bold mb-4">${product.price}</p>
        <p className="mb-4">{product.description}</p>
        <p className="mb-4">
          Rating: {product.rating?.rate} ({product.rating?.count} reviews)
        </p>
        <button
          onClick={() => addItemHandler(product)}
          className="px-4 py-2 rounded bg-indigo-600 text-white"
        >
          Add to Cart
        </button>
      </div>
      <Toaster />
    </div>
  );
}
