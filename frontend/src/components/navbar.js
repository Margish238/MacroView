import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar modern">
      <div className="navbar-container">
        <div className="logo"><Link to="/" onClick={toggleMenu}>MacroView</Link></div>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/upload" title="Upload Food"><FiSearch size={20} color="#f5f5f5" /></Link></li>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
