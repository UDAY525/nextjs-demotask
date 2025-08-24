"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";
import { CartProvider } from "../context/CartContext";
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
