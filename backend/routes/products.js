// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT id, name, price FROM products').all();
  res.json(rows);
});

module.exports = router;
