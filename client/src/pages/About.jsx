import React, { useState, useEffect } from 'react';
import { aboutData } from '../data';
import './About.css';

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAbout(aboutData);
    setLoading(false);
  }, []);

  if (loading) return (
    <div style={{marginTop: 64}}>
      <div className="loading-spinner" style={{minHeight: '60vh'}}>
        <div className="spinner-border spinner-border-custom" role="status" />
      </div>
    </div>
  );

  return (
    <div style={{marginTop: 64}}>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <p className="eyebrow-text-light">Загальна інформація</p>
          <h1>Про університет</h1>
          <p>Все, що вам потрібно знати про НУІТ</p>
        </div>
      </div>

      {about && (
        <div className="container about-page-content">
          {/* Main Info */}
          <div className="row g-5 align-items-center mb-5">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80"
                alt="Університет"
                className="about-full-img"
              />
            </div>
            <div className="col-lg-6">
              <span className="about-founded-tag">Засновано у {about.founded} році</span>
              <h2 className="about-name">{about.name}</h2>
              <p className="about-full-desc">{about.description}</p>
              <div className="about-mission-block">
                <h5>🎯 Місія університету</h5>
                <p>{about.mission}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="about-stats-section">
            <h3 className="text-center mb-4">Університет у цифрах</h3>
            <div className="row g-3 text-center">
              {[
                { label: 'Студентів навчається', value: about.stats.students.toLocaleString('uk-UA'), icon: '🎓' },
                { label: 'Факультетів', value: about.stats.faculties, icon: '🏛️' },
                { label: 'Кафедр', value: about.stats.departments, icon: '📚' },
                { label: 'Викладачів', value: about.stats.teachers, icon: '👨‍🏫' },
              ].map((s, i) => (
                <div key={i} className="col-6 col-md-3">
                  <div className="about-stat-card">
                    <div className="about-stat-icon">{s.icon}</div>
                    <div className="about-stat-value">{s.value}</div>
                    <div className="about-stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Faculties */}
          <div className="faculties-section">
            <h3 className="section-title mb-2">Факультети університету</h3>
            <div className="section-divider"></div>
            <div className="row g-3 mt-2">
              {about.faculties.map((faculty, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <div className="faculty-card">
                    <div className="faculty-num">0{i + 1}</div>
                    <div className="faculty-name">{faculty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
