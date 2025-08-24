"use client";
import { useState } from "react";
import { useCart } from "./CartContext";

export default function CartButton() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [open, setOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
      >
        🛒{" "}
        {cart.length > 0 && (
          <span className="bg-red-500 text-white text-sm px-2 py-0.5 rounded-full">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Mini cart drawer */}
      {open && (
        <div className="fixed bottom-20 right-4 w-80 max-h-[70vh] overflow-y-auto bg-white dark:bg-gray-800 border rounded-lg shadow-xl p-4 z-50">
          <h2 className="text-lg font-semibold mb-3">Your Cart</h2>

          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">Cart is empty</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">${item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 bg-gray-200 dark:bg-gray-700 rounded"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 bg-gray-200 dark:bg-gray-700 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}

          {cart.length > 0 && (
            <div className="mt-4 border-t pt-3">
              <p className="font-semibold">Total: ${total.toFixed(2)}</p>
              <button
                onClick={() => alert("This is a demo assignment")}
                className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
