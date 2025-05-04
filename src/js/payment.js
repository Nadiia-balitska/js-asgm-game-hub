const modal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const checkoutBtn = document.querySelector('.card_checkout_btn');

checkoutBtn.addEventListener('click', () => {
  localStorage.removeItem('cart'); // Очистити кошик
  modal.classList.remove('hidden'); // Показати модальне вікно
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  window.location.href = 'index.html'; // Повернутись на головну
});
