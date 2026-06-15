import React, { useState, useEffect } from 'react';
import { newsData } from '../data';
import NewsCard from '../components/NewsCard';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Всі');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNews(newsData);
    setFiltered(newsData);
    const cats = ['Всі', ...new Set(newsData.map(n => n.category))];
    setCategories(cats);
    setLoading(false);
  }, []);

  const applyFilters = (cat, searchVal) => {
    let result = news;
    if (cat !== 'Всі') {
      result = result.filter(n => n.category === cat);
    }
    if (searchVal.trim()) {
      const q = searchVal.toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  };

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    applyFilters(cat, search);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    applyFilters(activeCategory, e.target.value);
  };

  return (
    <div style={{ marginTop: 64 }}>
      <div className="page-header">
        <div className="container">
          <p className="eyebrow-text-light">Актуально</p>
          <h1>Новини університету</h1>
          <p>Останні події та досягнення НУІТ</p>
        </div>
      </div>

      <div className="container news-page">
        {/* Search & Filter */}
        <div className="news-controls">
          <div className="news-search">
            <input
              type="text"
              placeholder="Пошук новин..."
              value={search}
              onChange={handleSearch}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="news-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner-border spinner-border-custom" role="status" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="no-results">
            <p>🔎 Новин за вашим запитом не знайдено</p>
            <button onClick={() => { setSearch(''); setActiveCategory('Всі'); setFiltered(news); }}>
              Скинути фільтри
            </button>
          </div>
        ) : (
          <>
            <p className="news-count">Знайдено новин: <strong>{filtered.length}</strong></p>
            <div className="row g-4">
              {filtered.map(item => (
                <div key={item.id} className="col-lg-4 col-md-6">
                  <NewsCard news={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default News;
