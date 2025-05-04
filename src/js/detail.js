document.addEventListener('DOMContentLoaded', () => {
  const apiBase = 'https://api.noroff.dev/api/v1/gamehub';

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const addToCartBtn = document.getElementById('add-to-cart');

  if (!productId) {
    document.querySelector('.details').innerHTML = '<p>Product not found.</p>';
    return;
  }

  fetchProductDetails(productId);

  async function fetchProductDetails(id) {
    try {
      const response = await fetch(`${apiBase}/${id}`);
      const product = await response.json();

      document.getElementById('product-title').textContent = product.title;
      document.getElementById(
        'product-price'
      ).textContent = `Price: ${product.price} NOK`;
      document.getElementById('product-description').textContent =
        product.description;
      document.getElementById('product-image').src = product.image;
      document.getElementById('product-image').alt = product.title;

      if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
          addToCart(product);
        });
      }
    } catch (error) {
      document.querySelector('.details').innerHTML =
        '<p>Failed to load product details.</p>';
    }
  }

  function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cartItems.find(item => item.id === String(product.id));

    if (!exists) {
      cartItems.push({
        id: String(product.id),
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      localStorage.setItem('cart', JSON.stringify(cartItems));
      alert('✅ Product added to cart!');
    } else {
      alert('🛒 Product is already in your cart.');
    }
  }
});
