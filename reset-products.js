// Backend/reset-products.js
const db = require('./db');

db.exec('DELETE FROM products;');

const rows = db.prepare('SELECT * FROM products').all();
console.log('After DELETE, products length =', rows.length);