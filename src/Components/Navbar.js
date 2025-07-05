// src/components/Navbar.js

import { Link } from "react-router-dom";
//import React, { useState } from "react";

const Navbar = ({ onToggleTheme, theme }) => {
  //const [showDropdown, setShowDropdown] = useState(false);
  return (
    <nav
      style={{
        backgroundColor: theme === "dark" ? "#1c1c1c" : "#3498db",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>📊 Stock Tracker</h2>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Home
        </Link>
        <Link
          to="/about"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          About
        </Link>
        {/* <li
          className="dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span style={{ marginRight: "20px" }}>About</span>
          {showDropdown && (
            <ul
              className="dropdown-menu"
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                backgroundColor: theme === "dark" ? "#1c1c1c" : "#3498db",
              }}
            >
              <li style={{ textDecoration: "none" }}>
                <Link to="/about">About This App</Link>
              </li>
            </ul>
          )}
        </li> */}
        <Link
          to="/contact"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Contact
        </Link>
        <Link
          to="/wishlist"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Wishlist
        </Link>
        <Link
          to="/news"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          News
        </Link>

        {/* Theme Toggle Button */}

        <button
          onClick={onToggleTheme}
          style={{
            backgroundColor: "white",
            color: theme === "dark" ? "#1c1c1c" : "#3498db",
            border: "none",
            padding: "6px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
