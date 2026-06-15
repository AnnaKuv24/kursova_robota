import React, { useState, useEffect } from 'react';
import { contactsData } from '../data';
import './Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setContacts(contactsData);
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Введіть ваше ім'я";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Введіть коректний email';
    if (!form.message.trim() || form.message.length < 10) errs.message = 'Повідомлення має містити мінімум 10 символів';
    return errs;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const encode = (data) =>
    Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus('loading');
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...form }),
      });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ marginTop: 64 }}>
      <div className="page-header">
        <div className="container">
          <p className="eyebrow-text-light">Зв'язок</p>
          <h1>Контакти</h1>
          <p>Ми завжди раді відповісти на ваші запитання</p>
        </div>
      </div>

      <div className="container contacts-page">
        <div className="row g-5">
          {/* Contact Info */}
          <div className="col-lg-5">
            <h3 className="section-title mb-2">Наші контакти</h3>
            <div className="section-divider"></div>

            {contacts && (
              <div className="contacts-info-list">
                {[
                  { icon: '📍', label: 'Адреса', value: contacts.address },
                  { icon: '📞', label: 'Телефон', value: contacts.phone, href: `tel:${contacts.phone.replace(/\D/g,'')}` },
                  { icon: '✉', label: 'Email', value: contacts.email, href: `mailto:${contacts.email}` },
                  { icon: '🕐', label: 'Графік роботи', value: contacts.workHours },
                ].map((item, i) => (
                  <div key={i} className="contacts-info-item">
                    <div className="contacts-info-icon">{item.icon}</div>
                    <div>
                      <div className="contacts-info-label">{item.label}</div>
                      {item.href
                        ? <a href={item.href} className="contacts-info-value link">{item.value}</a>
                        : <div className="contacts-info-value">{item.value}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Google Map Embed */}
            <div className="map-container">
              <iframe
                title="Розташування університету"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.488!2d30.5234!3d50.4501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDI3JzAwLjQiTiAzMMKwMzEnMjQuMiJF!5e0!3m2!1suk!2sua!4v1620000000000!5m2!1suk!2sua"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: 12 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <h3 className="section-title mb-2">Написати нам</h3>
            <div className="section-divider"></div>

            {status === 'success' && (
              <div className="alert-success-custom">
                ✅ Дякуємо! Ваше повідомлення успішно надіслано. Ми зв'яжемося з вами найближчим часом.
              </div>
            )}
            {status === 'error' && (
              <div className="alert-error-custom">
                ❌ Виникла помилка. Будь ласка, спробуйте ще раз або зв'яжіться з нами по телефону.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" name="contact" data-netlify="true" noValidate>
              <input type="hidden" name="form-name" value="contact" />
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label-custom">Ваше ім'я *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`form-input-custom ${errors.name ? 'has-error' : ''}`}
                    placeholder="Іван Петренко"
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="col-md-6">
                  <label className="form-label-custom">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`form-input-custom ${errors.email ? 'has-error' : ''}`}
                    placeholder="ivan@email.com"
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                <div className="col-12">
                  <label className="form-label-custom">Повідомлення *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`form-input-custom form-textarea ${errors.message ? 'has-error' : ''}`}
                    placeholder="Ваше запитання або повідомлення..."
                    rows={6}
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn-primary-custom"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? '⏳ Відправляємо...' : '📨 Надіслати повідомлення'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
