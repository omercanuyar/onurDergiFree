import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import { ReactComponent as Logo } from '../assets/svg/logo.svg';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="logo-section">
          <Logo style={{ width: 230, height: 100 }} />
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">ANASAYFA</Link>
          <span className="nav-divider" />
          <Link to="/hakkimizda" className="nav-link">HAKKIMIZDA</Link>
          <span className="nav-divider" />
          <Link to="/arsiv" className="nav-link">ARŞİV</Link>
        </nav>
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          ☰
        </button>
      </header>
      
      <nav className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMobileMenu}>ANASAYFA</Link>
        <Link to="/hakkimizda" className="nav-link" onClick={closeMobileMenu}>HAKKIMIZDA</Link>
        <Link to="/arsiv" className="nav-link" onClick={closeMobileMenu}>ARŞİV</Link>
      </nav>
    </>
  );
}
