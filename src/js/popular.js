const popularUrl = 'https://api.noroff.dev/api/v1/gamehub';
const swiperWrapper = document.querySelector('.swiper-wrapper');

async function loadPopularGames() {
  try {
    const response = await fetch(popularUrl);
    const gamesList = await response.json();

    const detailedGames = await Promise.all(
      gamesList.map(async game => {
        const gameRes = await fetch(`${popularUrl}/${game.id}`);
        return await gameRes.json();
      })
    );

    const popularGames = detailedGames.slice(0, 10);

    swiperWrapper.innerHTML = '';

    popularGames.forEach(game => {
      const slide = document.createElement('li');
      slide.classList.add('swiper-slide');

      slide.innerHTML = `
        <a href="/details.html?id=${game.id}">
          <img class="swiper-img" src="${game.image}" alt="${game.title}" />
        </a>
      `;

      swiperWrapper.appendChild(slide);
    });

    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 2000,
      },
      slidesPerView: 2,
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
        767: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6,
        },
        1440: {
          slidesPerView: 8,
        },
      },
    });
  } catch (error) {
    swiperWrapper.innerHTML = '<li>Failed to load games 😢</li>';
  }
}

loadPopularGames();
