import React from "react";

export default function Cart({ cart, removeFromCart, total }) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-2xl font-semibold mb-4">
        Cart ({cart.length})
      </h2>
      {cart.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>{item.name}</span>
                <span>${item.price}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 ml-2 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="font-semibold">Total: ${total}</p>
          <button className="bg-green-600 text-white px-4 py-2 mt-3 rounded hover:bg-green-700">
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
