import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">НУІТ</div>
            <div className="logo-text">
              <span className="logo-name">Національний університет</span>
              <span className="logo-sub">інформаційних технологій</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="navbar-menu">
            <li><NavLink to="/" end>Головна</NavLink></li>
            <li><NavLink to="/about">Про сайт</NavLink></li>
            <li><NavLink to="/gallery">Галерея</NavLink></li>
            <li><NavLink to="/news">Новини</NavLink></li>
            <li><NavLink to="/contacts">Контакти</NavLink></li>
          </ul>

          {/* Burger */}
          <button 
            className={`burger-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Відкрити меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><NavLink to="/" end>Головна</NavLink></li>
            <li><NavLink to="/about">Про сайт</NavLink></li>
            <li><NavLink to="/gallery">Галерея</NavLink></li>
            <li><NavLink to="/news">Новини</NavLink></li>
            <li><NavLink to="/contacts">Контакти</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
