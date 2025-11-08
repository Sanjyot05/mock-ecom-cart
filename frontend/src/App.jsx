import React, { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        🛒 My Mock E-Commerce Store
      </h1>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Products */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="border rounded-xl p-4 bg-gray-50 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
                <p className="text-gray-600 mb-3">₹{p.price}</p>
                <button
                  onClick={() => addToCart(p)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="bg-white p-6 rounded-2xl shadow h-fit">
          <h2 className="text-2xl font-semibold mb-4">Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">No items yet.</p>
          ) : (
            <>
              <ul className="mb-4 space-y-2">
                {cart.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span>₹{item.price}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="font-semibold text-lg mb-3">Total: ₹{total}</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700">
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
