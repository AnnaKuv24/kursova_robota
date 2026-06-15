const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load database
const getDB = () => {
  const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
  return JSON.parse(data);
};

// Routes

// GET all news
app.get('/api/news', (req, res) => {
  const db = getDB();
  res.json(db.news);
});

// GET single news by id
app.get('/api/news/:id', (req, res) => {
  const db = getDB();
  const news = db.news.find(n => n.id === parseInt(req.params.id));
  if (!news) return res.status(404).json({ message: 'Новину не знайдено' });
  res.json(news);
});

// GET gallery
app.get('/api/gallery', (req, res) => {
  const db = getDB();
  res.json(db.gallery);
});

// GET about info
app.get('/api/about', (req, res) => {
  const db = getDB();
  res.json(db.about);
});

// GET contacts
app.get('/api/contacts', (req, res) => {
  const db = getDB();
  res.json(db.contacts);
});

// POST contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Всі поля обов'язкові" });
  }
  // In real scenario, we'd save to DB or send email
  res.json({ success: true, message: 'Повідомлення успішно надіслано!' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
