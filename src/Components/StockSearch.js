import React, { useState, useEffect } from "react";
import axios from "axios";

const StockSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allSymbols, setAllSymbols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const API_KEY = process.env.REACT_APP_FINNHUB_KEY;

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await axios.get(
          `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`
        );
        setAllSymbols(res.data);
      } catch (err) {
        console.error("Error fetching symbols:", err);
      }
      setLoading(false);
    };
    fetchSymbols();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setQuery(value);
    setErrorMsg(""); // clear error

    if (value.length > 0) {
      const matches = allSymbols
        .filter(
          (sym) =>
            sym.symbol.startsWith(value) ||
            sym.description.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (symbol) => {
    setQuery(symbol);
    setSuggestions([]);
    setErrorMsg(""); // clear error
    onSearch(symbol);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      setErrorMsg("⚠️ Please enter a stock symbol.");
      return;
    }
    setSuggestions([]);
    setErrorMsg("");
    onSearch(query.trim());
  };

  // Spinner styles
  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80px",
  };

  const spinnerCircle = {
    width: "40px",
    height: "40px",
    border: "4px solid #ccc",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  // Add keyframes
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    if (styleSheet) {
      try {
        styleSheet.insertRule(
          `@keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }`,
          styleSheet.cssRules.length
        );
      } catch (error) {
        // ignore duplicate rule error
      }
    }
  }, []);

  return (
    <div style={{ marginBottom: "30px" }}>
      {loading ? (
        <div style={spinnerStyle}>
          <div style={spinnerCircle}></div>
        </div>
      ) : (
        <div className="search-box">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search stock (e.g. AAPL, Tesla)"
              // style={{
              //   padding: "10px",
              //   width: "300px",
              //   fontSize: "16px",
              //   marginBottom: "10px",
              // }}
            />
            <button
              type="submit"
              style={{
                marginLeft: "10px",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </form>

          {/* Error Message */}
          {errorMsg && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              {errorMsg}
            </p>
          )}

          {/* Suggestions */}
          <div className="suggestions">
          {suggestions.length > 0 && (
            <ul
              
            >
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item.symbol)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                    transition: "background-color 0.2s",
                    borderRadius: "5px",
                    margin: "5px 0",

                  }}
                >
                  <strong>{item.symbol}</strong> — {item.description}
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default StockSearch;
