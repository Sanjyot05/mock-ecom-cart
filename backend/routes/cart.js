// routes/cart.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const items = db.prepare(`
    SELECT c.id, c.productId, c.qty, p.name, p.price, (c.qty * p.price) as lineTotal
    FROM cart c
    JOIN products p ON p.id = c.productId
  `).all();
  const total = items.reduce((s, it) => s + it.lineTotal, 0);
  res.json({ items, total });
});

router.post('/', (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) return res.status(400).json({ error: 'productId and qty required' });
  const stmt = db.prepare('INSERT INTO cart (productId, qty) VALUES (?, ?)');
  const info = stmt.run(productId, qty);
  res.json({ id: info.lastInsertRowid, productId, qty });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { qty } = req.body;
  db.prepare('UPDATE cart SET qty = ? WHERE id = ?').run(qty, id);
  res.json({ id, qty });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.prepare('DELETE FROM cart WHERE id = ?').run(id);
  res.json({ removedId: id });
});

router.post('/checkout', (req, res) => {
  const { cartItems, name, email } = req.body;
  if (!cartItems || !Array.isArray(cartItems)) return res.status(400).json({ error: 'cartItems required' });

  let total = 0;
  const details = cartItems.map(ci => {
    const p = db.prepare('SELECT id, name, price FROM products WHERE id = ?').get(ci.productId);
    const line = { productId: p.id, name: p.name, price: p.price, qty: ci.qty, lineTotal: p.price * ci.qty };
    total += line.lineTotal;
    return line;
  });

  const receipt = { id: Date.now(), name, email, details, total, timestamp: new Date().toISOString() };
  db.prepare('DELETE FROM cart').run();
  res.json({ receipt });
});

module.exports = router;
