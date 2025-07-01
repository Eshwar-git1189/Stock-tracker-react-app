import React, { useEffect, useState } from "react";
import axios from "axios";
import SentimentBadge from "./SentimentBadge";

const NewsSection = ({ symbol }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!symbol) return;

    const fetchNews = async () => {
      const API_KEY = process.env.REACT_APP_FINNHUB_KEY;
      try {
        const res = await axios.get(
          `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=2024-01-01&to=2024-12-31&token=${API_KEY}`
        );
        setArticles(res.data.slice(0, 5)); // Limit to 5 articles
      } catch (err) {
        console.error("Failed to fetch news", err);
      }
    };

    fetchNews();
  }, [symbol]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>📰 Latest News for {symbol}</h3>
      {articles.map((article, index) => (
        <div key={index} style={{
          border: "1px solid #ddd",
          padding: "15px",
          margin: "15px auto",
          maxWidth: "600px",
          borderRadius: "10px",
          backgroundColor: "#f8f8f8"
        }}>
          <a href={article.url} target="_blank" rel="noreferrer">
            <strong>{article.headline}</strong>
          </a>
          <p>{article.summary}</p>
          <SentimentBadge text={article.headline} />
        </div>
      ))}
    </div>
  );
};

export default NewsSection;
