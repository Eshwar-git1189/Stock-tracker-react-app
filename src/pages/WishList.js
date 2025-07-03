// src/pages/Wishlist.js
import React, { useEffect, useState } from "react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (symbol) => {
    const updated = wishlist.filter((item) => item !== symbol);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#3498db",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",

      }}
    >
      <h2>📌 Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No stocks in wishlist.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {wishlist.map((symbol, i) => (
            <li
              key={i}
              style={{
                margin: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "300px",
                marginInline: "auto",
              }}
            >
              <span>{symbol}</span>
              <button
                onClick={() => removeFromWishlist(symbol)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
