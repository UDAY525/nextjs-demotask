"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useCart();

  // Helper to decrease quantity or remove if qty becomes 0
  const decreaseQty = (item) => {
    decreaseQuantity(item);
  };

  // Helper to increase quantity
  const increaseQty = (item) => {
    addToCart(item);
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded text-center">
          <p className="mb-4 text-black">No items in cart.</p>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white  rounded hover:bg-blue-700"
          >
            Go to Home
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-3"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price} × {item.qty}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQty(item)}
                      className="px-2 text-black bg-gray-200 dark:bg-gray-700 rounded"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item)}
                      className="px-2 text-black bg-gray-200 dark:bg-gray-700 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right font-semibold">
            Total: ${total.toFixed(2)}
          </div>
          <Link
            href="/"
            className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
