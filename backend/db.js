// db.js
const Database = require('better-sqlite3');
const db = new Database('./data.db');

db.exec(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price REAL
);
CREATE TABLE IF NOT EXISTS cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  productId INTEGER,
  qty INTEGER,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

const row = db.prepare('SELECT COUNT(*) as c FROM products').get();
if (row.c === 0) {
  const insert = db.prepare('INSERT INTO products (id, name, price) VALUES (?, ?, ?)');
  insert.run(1, 'Vibe T-Shirt', 19.99);
  insert.run(2, 'Vibe Hoodie', 39.99);
  insert.run(3, 'Vibe Cap', 12.5);
  insert.run(4, 'Vibe Sneakers', 59.0);
  insert.run(5, 'Vibe Mug', 9.5);
}

module.exports = db;
