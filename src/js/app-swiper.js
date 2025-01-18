document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.app_item');
  let currentIndex = 0;

  const switchSlide = () => {
    items[currentIndex].style.display = 'none';

    currentIndex = (currentIndex + 1) % items.length;

    items[currentIndex].style.display = 'block';
  };

  setInterval(switchSlide, 2000);
});
