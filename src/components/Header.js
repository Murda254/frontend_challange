import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom'; 

import logo from '../assets/logos/logo.png'; 
import profilePicture from '../assets/icons/profile-picture.PNG'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="brand-name">OYOTEE</h1>
      </div>

      <nav className="nav-links">
        <Link to="/">Shop</Link>
        <Link to="/plantcare">Plant Care</Link>
        <Link to="/workshops">Workshops</Link>
        <Link to="/blogs">Blogs</Link>
      </nav>

      <div className="header-icons">
        <i className="icon-cart">🛒</i>
        <i className="icon-favorites">❤️</i>
        <div className="profile-picture">
          <img src={profilePicture} alt="Profile" />
        </div>
      </div>
    </header>
  );
};

export default Header;