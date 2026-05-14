// backend/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('./db'); // SQLite instance

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Serve frontend as static
app.use(express.static(path.join(__dirname, '../frontend')));

// ===== PRODUCTS =====

// Get all products
app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// OPTIONAL: endpoint to add new product (for admin/demo via Postman)
app.post('/api/products', (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    const stmt = db.prepare(`
      INSERT INTO products (name, price, image, description)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(name, price, image || null, description || null);
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// ===== AUTH (USERS) =====

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password_hash)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(name, email, passwordHash);

    const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(result.lastInsertRowid);

    res.json({
      success: true,
      message: 'Registration successful',
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRow = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!userRow) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, userRow.password_hash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const user = { id: userRow.id, name: userRow.name, email: userRow.email };

    res.json({
      success: true,
      message: 'Login successful',
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ===== ORDERS =====

// Process order
app.post('/api/orders', (req, res) => {
  try {
    const { items, total, userId } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    const now = new Date().toISOString();

    const insertOrder = db.prepare(`
      INSERT INTO orders (user_id, total, created_at)
      VALUES (?, ?, ?)
    `);
    const insertOrderItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `);

    const transaction = db.transaction(() => {
      const orderResult = insertOrder.run(userId || null, total, now);
      const orderId = orderResult.lastInsertRowid;

      items.forEach(item => {
        insertOrderItem.run(
          orderId,
          item.id,
          item.quantity || 1,
          item.price
        );
      });

      return orderId;
    });

    const orderId = transaction();

    res.json({ success: true, orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to process order' });
  }
});

// OPTIONAL: get all orders (admin/demo)
app.get('/api/orders', (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`E-commerce server with SQLite running on http://localhost:${PORT}`);
});