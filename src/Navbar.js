import React from 'react';
import './Navbar.css';
const Navbar = ({ onLogout, onProfile }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
       <p>Idea Vest</p>
      </div>
      <div className="navbar-buttons">
        <button onClick={onProfile}>Profile</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;