const swiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: {
    delay: 2000,
  },
  slidesPerView: 1,
  navigation: {
    nextEl: '.custom-next',
    prevEl: '.custom-prev',
  },
  allowTouchMove: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    425: {
      slidesPerView: 2,
    },
    765: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1440: {
      slidesPerView: 5,
    },
  },
});
