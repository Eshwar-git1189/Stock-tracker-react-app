// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Wishlist from "./pages/WishList";
import Contact from "./pages/Contact";
import News from "./pages/News";
import axios from "axios";

function App() {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState("light");

  const handleSearch = async (symbol) => {
    const API_KEY = process.env.REACT_APP_FINNHUB_KEY;
    try {
      const res = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );

      if (!res.data || res.data.c === 0) {
        setData(null);
        return;
      }
      setSymbol(symbol);
      setData(res.data);
    } catch (err) {
      console.error("API error", err);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const backgroundColor = theme === "dark" ? "#121212" : "#f4f4f4";
  const textColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <Router>
      <div style={{ backgroundColor, color: textColor, minHeight: "100vh" }}>
        <Navbar onToggleTheme={toggleTheme} theme={theme} />
        <div style={{ padding: "30px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home symbol={symbol} data={data} onSearch={handleSearch} />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

// Note: Make sure to replace the API_KEY with your actual Finnhub API key.
//API key:d1hp0u1r01qsvr2bhi10d1hp0u1r01qsvr2bhi1g
