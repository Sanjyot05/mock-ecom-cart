// backend/app.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Mock product data
const products = [
  { id: 1, name: 'Wireless Mouse', price: 499 },
  { id: 2, name: 'Keyboard', price: 899 },
  { id: 3, name: 'USB Cable', price: 199 },
  { id: 4, name: 'Bluetooth Speaker', price: 1499 },
  { id: 5, name: 'Headphones', price: 999 },
];

let cart = [];

// GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// POST /api/cart
app.post('/api/cart', (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push({ ...product, qty });
    res.json({ message: 'Item added', cart });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// GET /api/cart
app.get('/api/cart', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ cart, total });
});

// DELETE /api/cart/:id
app.delete('/api/cart/:id', (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(item => item.id !== id);
  res.json({ message: 'Item removed', cart });
});

// POST /api/checkout
app.post('/api/checkout', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const receipt = { total, timestamp: new Date().toISOString() };
  cart = [];
  res.json(receipt);
});

// Start server
app.listen(5000, () => console.log('✅ Backend running on http://localhost:5000'));
