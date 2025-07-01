import React from "react";

const getSentimentColor = (text) => {
  const positiveWords = ["gain", "growth", "surge", "rise", "positive", "beat"];
  const negativeWords = ["drop", "loss", "fall", "decline", "plunge", "miss"];

  const lower = text.toLowerCase();
  if (positiveWords.some(word => lower.includes(word))) return "green";
  if (negativeWords.some(word => lower.includes(word))) return "red";
  return "gray";
};

const SentimentBadge = ({ text }) => {
  const color = getSentimentColor(text);
  const label =
    color === "green" ? "Positive" :
    color === "red" ? "Negative" :
    "Neutral";

  return (
    <span style={{
      backgroundColor: color,
      color: "#fff",
      padding: "4px 10px",
      borderRadius: "15px",
      marginTop: "8px",
      display: "inline-block",
      fontSize: "12px"
    }}>
      {label}
    </span>
  );
};

export default SentimentBadge;
