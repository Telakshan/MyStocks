import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css'
const Navigation = () => {
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h1 className="logo-font">My Stocks</h1>
      </Link>

      <ul className="nav-menu">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
