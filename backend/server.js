// server.js
const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
