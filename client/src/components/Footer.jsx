import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="row g-4">
            {/* About */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-logo">
                <div className="footer-logo-icon">НУІТ</div>
                <span>Національний університет<br/>інформаційних технологій</span>
              </div>
              <p className="footer-desc">
                Провідний заклад вищої освіти України, що готує висококваліфікованих 
                фахівців у галузі IT та комп'ютерних наук з 1960 року.
              </p>
              <div className="social-links">
                <a href="#" title="Facebook" aria-label="Facebook">f</a>
                <a href="#" title="Instagram" aria-label="Instagram">in</a>
                <a href="#" title="YouTube" aria-label="YouTube">▶</a>
                <a href="#" title="Telegram" aria-label="Telegram">✈</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5 className="footer-heading">Навігація</h5>
              <ul className="footer-links">
                <li><Link to="/">Головна</Link></li>
                <li><Link to="/about">Про університет</Link></li>
                <li><Link to="/news">Новини</Link></li>
                <li><Link to="/gallery">Галерея</Link></li>
                <li><Link to="/contacts">Контакти</Link></li>
              </ul>
            </div>

            {/* For Students */}
            <div className="col-lg-3 col-md-6">
              <h5 className="footer-heading">Студентам</h5>
              <ul className="footer-links">
                <li><a href="#">Розклад занять</a></li>
                <li><a href="#">Електронний деканат</a></li>
                <li><a href="#">Бібліотека</a></li>
                <li><a href="#">Студентський портал</a></li>
                <li><a href="#">Спортивний клуб</a></li>
              </ul>
            </div>

            {/* Contacts */}
            <div className="col-lg-3 col-md-6">
              <h5 className="footer-heading">Контакти</h5>
              <ul className="footer-contacts">
                <li>
                  <span className="contact-icon">📍</span>
                  <span>вул. Університетська, 1,<br/>Київ, 03056, Україна</span>
                </li>
                <li>
                  <span className="contact-icon">📞</span>
                  <a href="tel:+380441234567">+38 (044) 123-45-67</a>
                </li>
                <li>
                  <span className="contact-icon">✉</span>
                  <a href="mailto:info@nuit.edu.ua">info@nuit.edu.ua</a>
                </li>
                <li>
                  <span className="contact-icon">🕐</span>
                  <span>Пн-Пт: 8:00–20:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>© {new Date().getFullYear()} НУІТ — Національний університет інформаційних технологій. Усі права захищено.</p>
            <p>Розроблено в рамках курсової роботи з дисципліни «Веб-програмування та веб-дизайн»</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
