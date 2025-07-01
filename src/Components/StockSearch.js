// src/components/StockSearch.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const StockSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allSymbols, setAllSymbols] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "d1hp0u1r01qsvr2bhi10d1hp0u1r01qsvr2bhi1g";

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
    if(e.query===""){
        <div>Stock not found</div>
    }
    if (value.length > 1) {
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
    onSearch(symbol); // Trigger search in parent
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
    setSuggestions([]);
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
  const styleSheet = document.styleSheets[0];
  if (styleSheet) {
    styleSheet.insertRule(
      `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
      styleSheet.cssRules.length
    );
  }

  return (
    <div style={{ marginBottom: "30px" }}>
      {loading ? (
        <div style={spinnerStyle}>
          <div style={spinnerCircle}></div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search stock (e.g. AAPL, Tesla)"
              style={{
                padding: "10px",
                width: "300px",
                fontSize: "16px",
                marginBottom: "10px",
              }}
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

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                marginTop: "5px",
                textAlign: "left",
                maxWidth: "300px",
                margin: "0 auto",
                backgroundColor: "#fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                borderRadius: "5px",
              }}
            >
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item.symbol)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <strong>{item.symbol}</strong> — {item.description}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default StockSearch;
