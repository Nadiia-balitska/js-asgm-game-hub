const cartList = document.querySelector('.cart_list');
const totalPriceDisplay = document.querySelector('.total_price_cart');
const subtotal = document.querySelector('.subtotal');
const subtotal_btn = document.querySelector('#subtotal_btn');

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  if (cartItems.length === 0) {
    cartList.innerHTML = '<p class="empty">Your cart is empty 🛒</p>';
    totalPriceDisplay.textContent = 'Total price: 0 NOK';
    return;
  }

  cartList.innerHTML = '';

  let total = 0;

  cartItems.forEach(item => {
    const itemElement = document.createElement('li');
    itemElement.classList.add('cart_item');

    itemElement.innerHTML = `
    <li class="cart_item">
     <img src="${item.image}" width="70" height="40" alt="${
      item.title
    }" class="cart_item_img" />
      <p class="item_name">${item.title}</p>
      <div class="amount_item">
  <button class="decrease" data-id="${item.id}">−</button>
  <span>${item.quantity}</span>
  <button class="increase" data-id="${item.id}">+</button>
      </div>
      <p class="price_cart">${item.price * item.quantity} NOK</p>
      <button class="remove_btn" data-id="${item.id}">🗑</button>
    </li>
     
    `;

    cartList.appendChild(itemElement);
    total += item.price * item.quantity;
  });
  document.querySelectorAll('.increase').forEach(btn => {
    btn.addEventListener('click', () => {
      updateQuantity(btn.dataset.id, 1);
    });
  });

  document.querySelectorAll('.decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      updateQuantity(btn.dataset.id, -1);
    });
  });

  totalPriceDisplay.textContent = `Total price: ${total} NOK`;
  subtotal.textContent = `${total} NOK`;
  subtotal_btn.textContent = `${total} NOK`;

  document.querySelectorAll('.remove_btn').forEach(button => {
    button.addEventListener('click', event => {
      const idToRemove = event.target.dataset.id;
      removeFromCart(idToRemove);
    });
  });
}

function updateQuantity(id, change) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cartItems.find(p => p.id === id);

  if (item) {
    item.quantity += change;

    if (item.quantity < 1) {
      const updated = cartItems.filter(p => p.id !== id);
      localStorage.setItem('cart', JSON.stringify(updated));
    } else {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    loadCart();
  }
}

function removeFromCart(id) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems = cartItems.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  loadCart();
}

loadCart();
