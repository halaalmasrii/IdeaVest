// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>IDEAVEST</h1>
      </div>
      <div className="navbar-links">
      <Link to="/" className="navbar-link">Home</Link>
        <Link to="/profile" className="navbar-link">Profile</Link>
        <Link to="/Opp" className="navbar-link">Opportunity</Link>
        <Link to="/complaint" className="navbar-link">Complaint</Link>
        <Link to="/subscription" className="navbar-link">Subscription</Link>
        <Link to="/Favorite" className="navbar-link">Favorite</Link>
      </div>
    </nav>
  );
};

export default Navbar;
