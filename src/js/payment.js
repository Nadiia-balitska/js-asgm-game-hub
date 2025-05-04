const modal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const checkoutBtn = document.querySelector('.card_checkout_btn');

checkoutBtn.addEventListener('click', () => {
  localStorage.removeItem('cart');
  modal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  window.location.href = 'index.html';
});
