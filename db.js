const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'ecommerce.db');
const db = new Database(dbPath);

db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

const seedProducts = [
  {
    name: "OnePlus 12R 5G (8GB/128GB)",
    price: 33999,
    image: "oneplus12r.jpg",
    description: "OnePlus 12R 5G with Snapdragon 8 Gen 2, 8GB RAM, 128GB storage and 120Hz AMOLED display. Perfect for gaming and heavy multitasking."
  },
  {
    name: "Redmi Note 13 Pro 5G (8GB/128GB)",
    price: 17999,
    image: "redminote13pro.jpg",
    description: "Redmi Note 13 Pro 5G with 200MP camera, 1.5K AMOLED display and 5000mAh battery with fast charging."
  },
  {
    name: "boAt Airdopes 141",
    price: 1299,
    image: "boatairdopes141.jpg",
    description: "boAt Airdopes 141 true wireless earbuds with ENx noise cancellation, up to 42 hours playback and ASAP fast charge."
  },
  {
    name: "HP Pavilion 14 Laptop (i5, 16GB/512GB)",
    price: 57990,
    image: "hppavilion14.jpg",
    description: "HP Pavilion 14 with Intel Core i5, 16GB RAM, 512GB SSD and 14\" FHD display. Great for students and professionals."
  },
  {
    name: "Noise ColorFit Smartwatch",
    price: 2499,
    image: "noisecolorfit.jpg",
    description: "Noise ColorFit smartwatch with AMOLED display, SpO2 monitor, heart-rate tracking and multiple sports modes."
  },
  {
    name: "OnePlus Nord CE4 5G (8GB/128GB)",
    price: 24999,
    image: "oneplusnordce4.jpg",
    description: "OnePlus Nord CE4 5G with Snapdragon 7 Gen 3, 8GB RAM, 128GB storage and 100W SUPERVOOC fast charging."
  },
  {
    name: "Redmi Buds 5 ANC",
    price: 2999,
    image: "redmibuds5.jpg",
    description: "Redmi Buds 5 with Active Noise Cancellation, dual-mic ENC and up to 38 hours total playback."
  },
  {
    name: "boAt Airdopes 161",
    price: 1099,
    image: "boatairdopes161.jpg",
    description: "boAt Airdopes 161 with ASAP fast charge, 40 hours playback and IPX5 water resistance."
  },
  {
    name: "HP Pavilion Gaming 15 (Ryzen 5/GTX 1650)",
    price: 69990,
    image: "hppaviliongaming15.jpg",
    description: "HP Pavilion Gaming 15 with AMD Ryzen 5, 8GB RAM, 512GB SSD and NVIDIA GTX 1650 for smooth gaming."
  },
  {
    name: "Noise ColorFit Pro 5",
    price: 3499,
    image: "noisecolorfitpro5.jpg",
    description: "Noise ColorFit Pro 5 AMOLED smartwatch with BT calling, Always-on display and 100+ sports modes."
  },
  {
    name: "OnePlus Bullets Wireless Z2",
    price: 1999,
    image: "oneplusbulletsz2.jpg",
    description: "OnePlus Bullets Wireless Z2 neckband with fast charging and deep bass for daily music and calls."
  },
  {
    name: "Redmi Power Bank 20000mAh",
    price: 1899,
    image: "redmipowerbank20000.jpg",
    description: "Redmi 20000mAh power bank with dual input, dual output and 18W fast charging support."
  }
];

const insert = db.prepare(`
  INSERT INTO products (name, price, image, description)
  VALUES (@name, @price, @image, @description)
`);

const countRow = db.prepare('SELECT COUNT(*) AS count FROM products').get();

if (countRow.count === 0) {
  const insertMany = db.transaction((products) => {
    for (const p of products) insert.run(p);
  });

  insertMany(seedProducts);
  console.log('Seeded products table with initial data.');
}

module.exports = db;