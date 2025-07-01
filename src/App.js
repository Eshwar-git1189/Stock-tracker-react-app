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
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (symbol) => {
  const API_KEY = process.env.REACT_APP_FINNHUB_KEY;
  try {
    const res = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
    );

    // If invalid stock (no price)
    if (!res.data || res.data.c === 0) {
      setErrorMsg("❌ Stock not found or no recent data.");
      setData(null);
      return;
    }
    // If valid stock, set data and clear error
    console.log("Stock data fetched:", res.data);
    // Set symbol and data
    // This will update the Home component to show the stock data
    // and clear any previous error messages
    // setSymbol is used to update the symbol in the Home component
    // setData is used to update the stock data in the Home component
    // setErrorMsg is used to clear any previous error messages
    // This is how the Home component will know to re-render with the new data
    // and symbol

    setSymbol(symbol);
    setData(res.data);
    setErrorMsg(""); // clear previous
  } catch (err) {
    console.error("API error", err);
    setErrorMsg("❌ Failed to fetch stock data.");
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
