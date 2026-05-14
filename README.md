# TechBazaar India – E‑Commerce Store (Code Alpha Task)

Basic e‑commerce website built as part of the **Code Alpha** internship.  
The project showcases a complete full‑stack implementation with product listings, shopping cart, order processing, user authentication, and a SQLite database.

---

## Features

- Product listing page with modern UI and Indian tech products
- Product details page with image, price (₹) and description
- Shopping cart using localStorage (add to cart, view items, total amount)
- Order processing API (orders stored in database)
- User registration and login (password hashing with bcrypt)
- Navbar shows logged‑in user name and logout option
- Responsive design for desktop and mobile
- SQLite database for:
  - Products
  - Users
  - Orders + Order items

All requirements from the Code Alpha task are implemented:

- Frontend: **HTML, CSS, JavaScript**
- Backend: **Express.js (Node.js)**
- Features:
  - Shopping cart
  - Product details page
  - Order processing
  - User registration/login
- Database: **SQLite** for products, users and orders

---

## Tech Stack

**Frontend**

- HTML5
- CSS3 (custom, no framework)
- Vanilla JavaScript (ES6)
  - Fetch API to call backend
  - DOM manipulation for product cards, cart, and auth
  - localStorage for cart and user session

**Backend**

- Node.js
- Express.js
- better‑sqlite3 (SQLite database driver)
- bcryptjs (password hashing)
- body‑parser, CORS

**Database**

- SQLite file: `backend/ecommerce.db`
- Tables:
  - `products (id, name, price, image, description)`
  - `users (id, name, email, password_hash)`
  - `orders (id, user_id, total, created_at)`
  - `order_items (id, order_id, product_id, quantity, price)`

Products are seeded automatically into the `products` table on first run.

---

## Project Structure

```text
ecommerce-store/
  backend/
    server.js        # Express server + APIs
    db.js            # SQLite connection, table creation, seeding
    ecommerce.db     # SQLite database file (auto‑created)
  frontend/
    index.html       # Product listing page
    product.html     # Product details page
    cart.html        # Shopping cart page
    auth.html        # Login / Register page
    style.css        # All styles
    script.js        # Frontend logic (products, cart, auth)
    images/          # Product images (OnePlus, Redmi, boAt, HP, Noise)
  README.md
  package.json
```

---

## How to Run (Local Setup)

### 1. Clone / Download project

- Extract the project folder (for Code Alpha submission you can zip this folder).

Open the folder in **VS Code**.

### 2. Install backend dependencies

In VS Code terminal:

```bash
cd backend
npm install
```

(Installs `express`, `cors`, `body-parser`, `better-sqlite3`, `bcryptjs`, etc.)

### 3. Start the backend server

```bash
node server.js
```

You should see something like:

```text
Seeded products table with initial data.
E-commerce server with SQLite running on http://localhost:3000
```

This means:

- SQLite database file `ecommerce.db` was created.
- Tables were created if they didn’t exist.
- Products were inserted if table was empty.

### 4. Open the frontend

Open your browser and go to:

```text
http://localhost:3000
```

Pages:

- `/` → `index.html` (product listing)
- `/cart.html` → shopping cart
- `/auth.html` → login / register
- `product.html?id=<productId>` → product details

---

## Main API Endpoints

- `GET /api/products` – Get all products
- `GET /api/products/:id` – Get single product by ID
- `POST /api/products` – (Optional, admin) Add a new product
- `POST /api/register` – Register a new user
- `POST /api/login` – Login user
- `POST /api/orders` – Create order (items + total + optional userId)
- `GET /api/orders` – (Optional, admin) Get all orders

---

## How Features Work (Short Explanation)

### Shopping Cart

- Cart data is stored in `localStorage` in the browser.
- `script.js` handles:
  - `addToCart(product)`
  - `loadCartDemo()` to display items and total
  - `updateCartCount()` to show item count in navbar

### User Registration/Login

- On register:
  - Frontend calls `POST /api/register` with name, email, password.
  - Backend hashes password using bcrypt and saves user in `users` table.
- On login:
  - Backend verifies password, returns user info (id, name, email).
  - Frontend stores user in `localStorage` and updates navbar.

### Orders & Database

- When user clicks “Proceed to Checkout”:
  - Frontend sends cart items, total, and current `userId` (if logged‑in) to `POST /api/orders`.
  - Backend creates a row in `orders`, then rows in `order_items`.
  - Returns `orderId` as confirmation.

---

## Possible Improvements (Future Work)

- JWT‑based authentication instead of localStorage only
- Admin panel to manage products and orders
- Pagination / filtering on product listing page
- Quantity selection in cart

