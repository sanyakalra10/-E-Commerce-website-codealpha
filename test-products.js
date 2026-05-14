// Backend/test-products.js
const db = require('./db');
const rows = db.prepare('SELECT * FROM products').all();
console.log('Products length =', rows.length);
console.log(rows);