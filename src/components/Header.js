import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import { ReactComponent as Logo } from '../assets/svg/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <div className="logo-section">
        {/* Logo yerine svg veya img ekleyebilirsiniz */}
        {/* <span className="logo-text">TOY</span> */}
        <Logo style={{ width: 230, height: 100 }} />
      </div>
      <nav className="nav">
        <Link to="/">ANASAYFA</Link>
        <Link to="/hakkimizda">HAKKIMIZDA</Link>
        <Link to="/arsiv">ARŞİV</Link>
        <Link to="/iletisim">İLETİŞİM</Link>
        <span className="search-icon" role="img" aria-label="search">🔍</span>
      </nav>
    </header>
  );
}
