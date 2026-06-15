import React, { useState, useEffect } from 'react';
import { galleryData } from '../data';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Всі');
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    setImages(galleryData);
    setFiltered(galleryData);
    const cats = ['Всі', ...new Set(galleryData.map(img => img.category))];
    setCategories(cats);
    setLoading(false);
  }, []);

  const filterByCategory = (cat) => {
    setActiveCategory(cat);
    if (cat === 'Всі') {
      setFiltered(images);
    } else {
      setFiltered(images.filter(img => img.category === cat));
    }
  };

  const openLightbox = (img) => setLightbox(img);
  const closeLightbox = () => setLightbox(null);

  return (
    <div style={{ marginTop: 64 }}>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <p className="eyebrow-text-light">Фотографії</p>
          <h1>Галерея</h1>
          <p>Наш університет у фотографіях</p>
        </div>
      </div>

      <div className="container gallery-page">
        {/* Filters */}
        <div className="gallery-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => filterByCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner-border spinner-border-custom" role="status" />
          </div>
        ) : (
          <div className="gallery-grid">
            {filtered.map(img => (
              <div
                key={img.id}
                className="gallery-item"
                onClick={() => openLightbox(img)}
              >
                <img src={img.url} alt={img.title} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-title">{img.title}</span>
                  <span className="gallery-item-cat">{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>✕</button>
            <img src={lightbox.url} alt={lightbox.title} />
            <div className="lightbox-caption">
              <strong>{lightbox.title}</strong>
              <span>{lightbox.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
