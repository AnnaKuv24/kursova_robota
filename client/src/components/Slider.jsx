import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Slider.css';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1400&q=85',
    title: 'Ласкаво просимо до НУІТ',
    subtitle: 'Національний університет інформаційних технологій',
    description: 'Освіта світового рівня, наука та інновації для майбутніх лідерів IT-індустрії',
    link: '/about',
    linkText: 'Дізнатись більше',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1400&q=85',
    title: 'Сучасна інфраструктура',
    subtitle: 'Навчання у найкращих умовах',
    description: 'Нові лабораторії, комп\'ютерні класи та простори для творчої роботи студентів',
    link: '/gallery',
    linkText: 'Переглянути галерею',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1400&q=85',
    title: 'Вступна кампанія 2025',
    subtitle: 'Стань частиною нашої родини',
    description: 'Нові спеціальності, стипендії та гарантоване працевлаштування для кращих випускників',
    link: '/news',
    linkText: 'Актуальні новини',
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((index) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 300);
  }, [transitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <div className="slider">
      <div className={`slider-track ${transitioning ? 'fading' : ''}`}>
        <div
          className="slider-slide"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slider-overlay"></div>
          <div className="container slider-content">
            <div className="slider-text fade-in-up">
              <span className="slider-eyebrow">{slide.subtitle}</span>
              <h1 className="slider-title">{slide.title}</h1>
              <p className="slider-desc">{slide.description}</p>
              <Link to={slide.link} className="btn-accent-custom">
                {slide.linkText}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button className="slider-btn slider-btn-prev" onClick={prev} aria-label="Попередній">
        ‹
      </button>
      <button className="slider-btn slider-btn-next" onClick={next} aria-label="Наступний">
        ›
      </button>

      {/* Dots */}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
