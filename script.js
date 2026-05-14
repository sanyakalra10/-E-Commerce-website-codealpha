// frontend/script.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Currency formatter for Indian Rupees
const rupeeFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

function formatINR(amount) {
  return rupeeFormatter.format(amount);
}

// Load products on main page
async function loadProducts() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();

    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <div class="product-image">
          <img src="images/${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="product-meta">Fast delivery across India</div>
          <div class="product-price">${formatINR(product.price)}</div>
          <a href="product.html?id=${product.id}" class="btn btn-outline">
            View Details
          </a>
        </div>
      `;
      container.appendChild(productCard);
    });
  } catch (error) {
    document.getElementById('productsContainer').innerHTML =
      '<div class="loading">Please start backend server first!</div>';
    console.error(error);
  }
}

// Load product details page
async function loadProductDetails(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    const product = await response.json();

    document.getElementById('productInfo').innerHTML = `
      <div class="product-image">
        <img src="images/${product.image}" alt="${product.name}">
      </div>
      <div>
        <div class="product-highlight">✓ In stock · Free delivery</div>
        <h1>${product.name}</h1>
        <div class="product-price" style="font-size: 2rem; margin: 0.5rem 0 1rem;">
          ${formatINR(product.price)}
        </div>
        <p class="product-description">${product.description}</p>
        <p style="font-size:0.85rem;color:#6b7280;">
          Prices inclusive of all taxes · Cash on delivery may be available in your area.
        </p>
      </div>
    `;

    const btn = document.getElementById('addToCartBtn');
    if (btn) {
      btn.onclick = () => addToCart(product);
    }
  } catch (error) {
    document.getElementById('productInfo').innerHTML =
      '<div class="loading">Product not found!</div>';
    console.error(error);
  }
}

// Add to cart
function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Update cart count (navbar)
function updateCartCount() {
  const count = cart.length;
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = count;
  });
}

// Load cart page
function loadCartDemo() {
  const cartItemsContainer = document.getElementById('cartItems');
  const totalAmountElement = document.getElementById('totalAmount');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p style="text-align:center; padding:2rem; color:#666;">Your cart is empty. <a href="index.html">Start shopping!</a></p>';
    totalAmountElement.textContent = formatINR(0);
    if (checkoutBtn) checkoutBtn.style.display = 'none';
    return;
  }

  let total = 0;
  const cartHTML = cart.map(item => {
    total += item.price;
    return `
      <div class="cart-item">
        <div class="cart-item-image">📦</div>
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>${formatINR(item.price)}</p>
        </div>
      </div>
    `;
  }).join('');

  cartItemsContainer.innerHTML = cartHTML;
  totalAmountElement.textContent = formatINR(total);
  if (checkoutBtn) checkoutBtn.style.display = 'inline-flex';

  if (checkoutBtn) {
    checkoutBtn.onclick = async () => {
      try {
        const currentUser = getCurrentUser();
const response = await fetch('http://localhost:3000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: cart,
    total,
    userId: currentUser ? currentUser.id : null
  })
});
        const result = await response.json();
        if (result.success) {
          alert(`Order #${result.orderId} placed successfully!`);
          cart = [];
          localStorage.removeItem('cart');
          window.location.href = 'index.html';
        }
      } catch (error) {
        alert('Please start backend server first!');
        console.error(error);
      }
    };
  }
}

// ===== Auth (register / login) =====

const USER_KEY = 'tb_user';

function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  renderUserArea();
}

function logoutUser() {
  localStorage.removeItem(USER_KEY);
  renderUserArea();
}

// Navbar user area render
function renderUserArea() {
  const userArea = document.getElementById('userArea');
  if (!userArea) return;

  const user = getCurrentUser();
  if (!user) {
    userArea.innerHTML = `<a href="auth.html">Login</a>`;
  } else {
    userArea.innerHTML = `
      Hi, ${user.name.split(' ')[0]}
      <button type="button" onclick="logoutUser()">Logout</button>
    `;
  }
}

// Auth page setup
function setupAuthPage() {
  renderUserArea();

  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const msg = document.getElementById('authMessage');

  if (!tabLogin || !loginForm) return;

  function showMessage(text, isError = false) {
    msg.textContent = text;
    msg.classList.toggle('error', isError);
  }

  tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    showMessage('');
  });

  tabRegister.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    showMessage('');
  });

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showMessage('Registering...');

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!data.success) {
        showMessage(data.message || 'Registration failed', true);
        return;
      }
      setCurrentUser(data.user);
      showMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 800);
    } catch (err) {
      console.error(err);
      showMessage('Server error. Please try again.', true);
    }
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showMessage('Logging in...');

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!data.success) {
        showMessage(data.message || 'Login failed', true);
        return;
      }
      setCurrentUser(data.user);
      showMessage('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 800);
    } catch (err) {
      console.error(err);
      showMessage('Server error. Please try again.', true);
    }
  });
}

// Always render navbar user status
document.addEventListener('DOMContentLoaded', renderUserArea);