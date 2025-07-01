// src/components/Navbar.js

import { Link } from "react-router-dom";

const Navbar = ({ onToggleTheme, theme }) => {
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
