import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import NewsCard from '../components/NewsCard';
import { newsData, aboutData } from '../data';
import './Home.css';

const StatCard = ({ number, label, icon }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-number">{number.toLocaleString('uk-UA')}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const Home = () => {
  const [news, setNews] = useState([]);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNews(newsData.slice(0, 10));
    setAbout(aboutData);
    setLoading(false);
  }, []);

  return (
    <div className="home-page">
      {/* Slider */}
      <Slider />

      {/* Stats Section */}
      {about && (
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <StatCard number={about.stats.students} label="Студентів" icon="🎓" />
              <StatCard number={about.stats.faculties} label="Факультетів" icon="🏛️" />
              <StatCard number={about.stats.departments} label="Кафедр" icon="📚" />
              <StatCard number={about.stats.teachers} label="Викладачів" icon="👨‍🏫" />
            </div>
          </div>
        </section>
      )}

      {/* About Preview */}
      {about && (
        <section className="about-preview section-padding">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="about-image-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80"
                    alt="Університет"
                    className="about-main-img"
                  />
                  <div className="about-badge-float">
                    <span className="about-year">{new Date().getFullYear() - about.founded}</span>
                    <span>років досвіду</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <p className="eyebrow-text">Про університет</p>
                <h2 className="section-title">{about.name}</h2>
                <div className="section-divider"></div>
                <p className="about-description">{about.description}</p>
                <p className="about-mission"><strong>Місія:</strong> {about.mission}</p>
                <Link to="/about" className="btn-primary-custom mt-3 d-inline-block">
                  Детальніше про університет
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Section */}
      <section className="news-section section-padding bg-light-section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow-text">Актуально</p>
              <h2 className="section-title">Останні новини</h2>
              <div className="section-divider"></div>
            </div>
            <Link to="/news" className="btn-primary-custom">Всі новини</Link>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner-border spinner-border-custom" role="status">
                <span className="visually-hidden">Завантаження...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {news.map(item => (
                <div key={item.id} className="col-lg-4 col-md-6">
                  <NewsCard news={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-text">
              <h2>Готові розпочати навчання?</h2>
              <p>Подайте документи на вступ 2025 та станьте частиною університетської родини</p>
            </div>
            <div className="cta-buttons">
              <Link to="/contacts" className="btn-accent-custom">Зв'язатись з нами</Link>
              <Link to="/news" className="cta-btn-outline">Дізнатись про вступ</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
