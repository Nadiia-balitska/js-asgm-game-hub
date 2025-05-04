const apiUrl = 'https://api.noroff.dev/api/v1/gamehub';
const productContainer = document.getElementById('product_list');
const genreFilter = document.getElementById('genreFilter');

let allGames = [];

async function getGames() {
  try {
    productContainer.innerHTML = '<p>Loading games...</p>';
    const response = await fetch(apiUrl);
    allGames = await response.json();
    displayGames(allGames);
  } catch (error) {
    productContainer.innerHTML = '<p>Failed to load games 😢</p>';
  }
}

function displayGames(games) {
  productContainer.innerHTML = '';

  if (games.length === 0) {
    productContainer.innerHTML = '<p>No games found for this genre.</p>';
    return;
  }

  games.forEach(game => {
    const product = `
      <div class="game_card">
        <img src="${game.image}" alt="${game.title}" width="300px" class="game_img" />
        <h3 class="game_title">${game.title}</h3>
        <p class="game_price">${game.price} NOK</p>
        <a href="/details.html?id=${game.id}" class="details_button" >Details</a>
      </div>
    `;
    productContainer.innerHTML += product;
  });
}

if (genreFilter) {
  genreFilter.addEventListener('change', () => {
    const selectedGenre = genreFilter.value;
    if (selectedGenre === 'all') {
      displayGames(allGames);
    } else {
      const filtered = allGames.filter(
        game => game.genre && game.genre.toLowerCase() === selectedGenre
      );
      displayGames(filtered);
    }
  });
}

getGames();
