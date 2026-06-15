import React from 'react';
import { Link } from 'react-router-dom';
import './NewsCard.css';

const NewsCard = ({ news }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="news-card card-custom">
      <div className="news-card-img-wrap">
        <img src={news.image} alt={news.title} loading="lazy" />
        <span className="badge-category news-card-badge">{news.category}</span>
      </div>
      <div className="news-card-body">
        <time className="news-card-date">{formatDate(news.date)}</time>
        <h3 className="news-card-title">{news.title}</h3>
        <p className="news-card-summary">{news.summary}</p>
        <Link to={`/news/${news.id}`} className="news-card-link">
          Читати далі <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
