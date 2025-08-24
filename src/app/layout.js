"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";
import { CartProvider, useCart } from "../context/CartContext";
import Link from "next/link";

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
  }, []);

  // Cart size logic
  function CartNavIcon() {
    const { cart } = useCart();
    console.log(cart);
    const cartSize = cart.reduce((sum, item) => sum + item.quantity, 0);
    return (
      <Link href="/cart">
        <div className="relative flex items-center">
          <span className="text-2xl">🛒</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <html lang="en">
      <head />
      <body>
        <CartProvider>
          <header className="w-full border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
            <div className="container mx-auto flex items-center gap-4">
              <Link className="text-xl font-semibold" href="/">
                ShopMini
              </Link>
              <nav className="ml-auto flex items-center gap-4">
                <CartNavIcon />
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="container mx-auto p-4">
            {mounted ? children : null}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
