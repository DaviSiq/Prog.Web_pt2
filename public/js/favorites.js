// Recupera os favoritos salvos no localStorage
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Salva os favoritos no localStorage
function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Remove um filme dos favoritos
function removeFavorite(movie) {
    let favorites = getFavorites();
    const index = favorites.findIndex(fav => fav.imdbID === movie.imdbID);

    favorites.splice(index, 1);
    saveFavorites(favorites);
    displayFavorites();
}

// Adiciona um filme aos favoritos
function addFavorite(movie) {
    let favorites = getFavorites();

    favorites.push(movie);
    saveFavorites(favorites);
    displayFavorites();
}

function displayFavorites() {
    const favoritesList = document.getElementById('result');
    const favorites = getFavorites();

    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<li>Nenhum favorito ainda.</li>';
        return;
    }

    favorites.forEach(movie => {
        let li = document.createElement('li');
        li.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" alt="${movie.Title}">
            <strong>${movie.Title} (${movie.Year})</strong>
        `;
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remover";
        removeButton.addEventListener('click', () => {
            removeFavorite(movie);
            displayFavorites();
        });
        li.appendChild(removeButton);
        favoritesList.appendChild(li);
    });
}

// Carregar favoritos ao iniciar
document.addEventListener("DOMContentLoaded", displayFavorites);
