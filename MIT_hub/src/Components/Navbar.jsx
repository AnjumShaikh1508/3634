import React from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">MIT Student Marketplace</h1>
      <div className="navbar-links">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/marketplace" className="nav-link" >Marketplace</NavLink>
        <NavLink to="/packages" className="nav-link" >Packages</NavLink>
        <NavLink to="/profile" className="nav-link" >Profile</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
