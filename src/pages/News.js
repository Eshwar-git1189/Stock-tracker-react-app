// src/pages/News.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import SentimentBadge from "../Components/SentimentBadge";

const News = () => {
  const [category, setCategory] = useState("general");
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const API_KEY = process.env.REACT_APP_FINNHUB_KEY;
  //console.log("API_KEY:", API_KEY); // Should print your key in the console

  const fetchNews = useCallback(
    async (selectedCategory) => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://finnhub.io/api/v1/news?category=${selectedCategory}&token=${API_KEY}`
        );
        setNewsList(res.data.slice(0, 30)); // fetch more to allow keyword filtering
      } catch (error) {
        console.error("Error fetching news:", error);
      }
      setLoading(false);
    },
    [API_KEY]
  );

  useEffect(() => {
    fetchNews(category);
  }, [category, fetchNews]);

  const filteredNews = newsList.filter(
    (article) =>
      article.headline.toLowerCase().includes(keyword.toLowerCase()) ||
      article.summary.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h2>📰 Market News</h2>

      {/* Dropdown Category Selector */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
          fontSize: "16px",
        }}
      >
        <option value="general">General</option>
        <option value="forex">Forex</option>
        <option value="crypto">Crypto</option>
        <option value="merger">Mergers</option>
        <option value="economy">Economy</option>
      </select>

      {/* Keyword Search Input */}
      <input
        type="text"
        placeholder="Search headlines or summaries..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      {/* Loader */}
      {loading ? (
        <div style={{ marginTop: "40px" }}>
          <p>🔄 Loading news...</p>
        </div>
      ) : (
        filteredNews.map((article, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              margin: "15px auto",
              padding: "15px",
              maxWidth: "600px",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              textAlign: "left",
            }}
          >
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              {article.headline}
            </a>
            <p style={{ fontSize: "14px", marginBottom: "5px" }}>
              {article.summary}
            </p>

            {/* Show Date */}
            <p style={{ fontSize: "12px", color: "#666" }}>
              🕒 {new Date(article.datetime * 1000).toLocaleString()}
            </p>

            <SentimentBadge text={article.headline} />
          </div>
        ))
      )}
    </div>
  );
};

export default News;
