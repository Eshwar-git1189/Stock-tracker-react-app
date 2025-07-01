// src/components/StockCard.js
import React from "react";

const addToWishlist = (symbol) => {
  const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!stored.includes(symbol)) {
    stored.push(symbol);
    localStorage.setItem("wishlist", JSON.stringify(stored));
    alert(`${symbol} added to wishlist!`);
  } else {
    alert(`${symbol} is already in wishlist.`);
  }
};

const StockCard = ({ symbol, data }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "20px auto",
        background: "#f9f9f9",
      }}
    >
      <h2>{symbol}</h2>
      <p>💰 Price: ${data.c}</p>
      <p>📉 Change: {data.d}</p>
      <p>📊 % Change: {data.dp}%</p>
      <button
        onClick={() => addToWishlist(symbol)}
        style={{
          marginTop: "10px",
          backgroundColor: "#27ae60",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ➕ Add to Wishlist
      </button>
    </div>
  );
};

export default StockCard;
