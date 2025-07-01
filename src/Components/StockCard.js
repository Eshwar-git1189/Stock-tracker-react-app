// src/components/StockCard.js
import React from "react";

const StockCard = ({ symbol, data }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "20px",
      borderRadius: "10px",
      maxWidth: "400px",
      margin: "20px auto",
      background: "#f9f9f9"
    }}>
      <h2>{symbol}</h2>
      <p>💰 Price: ${data.c}</p>
      <p>📉 Change: {data.d}</p>
      <p>📊 % Change: {data.dp}%</p>
    </div>
  );
};

export default StockCard;
