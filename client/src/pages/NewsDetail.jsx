import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsData } from '../data';
import './NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const found = newsData.find(n => n.id === parseInt(id, 10));
    if (found) {
      setNews(found);
    } else {
      setError(true);
    }
    setLoading(false);
  }, [id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('uk-UA', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  if (loading) return (
    <div style={{marginTop: 64}}>
      <div className="loading-spinner" style={{minHeight: '60vh'}}>
        <div className="spinner-border spinner-border-custom" role="status" />
      </div>
    </div>
  );

  if (error || !news) return (
    <div style={{marginTop: 64}} className="container py-5 text-center">
      <h2>Новину не знайдено</h2>
      <Link to="/news" className="btn-primary-custom d-inline-block mt-3">← Повернутись до новин</Link>
    </div>
  );

  return (
    <div style={{ marginTop: 64 }}>
      <div className="news-detail-hero" style={{ backgroundImage: `url(${news.image})` }}>
        <div className="news-detail-hero-overlay">
          <div className="container">
            <Link to="/news" className="news-back-link">← Назад до новин</Link>
            <span className="badge-category news-detail-badge">{news.category}</span>
            <h1 className="news-detail-title">{news.title}</h1>
            <time className="news-detail-date">{formatDate(news.date)}</time>
          </div>
        </div>
      </div>

      <div className="container news-detail-body">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <p className="news-detail-summary">{news.summary}</p>
            <div className="news-detail-content">
              <p>{news.content}</p>
            </div>
            <div className="news-detail-footer">
              <Link to="/news" className="btn-primary-custom">← Всі новини</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
