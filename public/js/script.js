// Função para alternar entre modo claro e escuro
document.getElementById('toggle-theme').addEventListener('click', function () {
    const body = document.body;
    console.log(body.classList)

    // Alterna entre as classes 'light' e 'dark'
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        document.getElementById('toggle-theme').textContent = '☀️'; // Ícone para o modo claro
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        document.getElementById('toggle-theme').textContent = '🌙'; // Ícone para o modo claro
    }
});

// Função de login (para o botão de login)
document.getElementById('login-btn').addEventListener('click', () => {
    window.location.href = '/login';

});

document.addEventListener("DOMContentLoaded", function () {
    let timeout = null;
    const searchInput = document.getElementById("movie-title");
    const resultsList = document.getElementById("results");

    searchInput.addEventListener("input", function () {
        let title = document.getElementById('movie-title').value;
        let year = document.getElementById('movie-year').value;
        let type = document.getElementById('movie-type').value;
        let plot = document.getElementById('plot-type').value;

        clearTimeout(timeout);

        if (title.length <= 2) {
            resultsList.innerHTML = "";
            return;
        }

        timeout = setTimeout(() => {
            fetch('/api/buscar-sugestoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, year, type, plot }),
            })
                .then(response => response.json())
                .then(data => {
                    displayResult(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }, 300);
    });
});

// Adiciona um event listener ao formulário com o ID 'omdb-form' que "escuta" o evento 'submit'.
document.getElementById('omdb-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let title = document.getElementById('movie-title').value;
    let year = document.getElementById('movie-year').value;
    let type = document.getElementById('movie-type').value;
    let plot = document.getElementById('plot-type').value;

    fetch('/api/buscar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, year, type, plot }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'False') {
                displayError(data.Error);
            } else {
                displayResult(data);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.addEventListener("click", function (event) {
    const searchInput = document.getElementById("movie-title");
    const resultsList = document.getElementById("results");

    // Verifica se o clique foi fora do input e da lista de sugestões
    if (!searchInput.contains(event.target) && !resultsList.contains(event.target)) {
        resultsList.style.display = "none"; // Esconde o dropdown
    }
});

// Garante que a dropdown reapareça quando o input for focado
document.getElementById("movie-title").addEventListener("focus", function () {
    const resultsList = document.getElementById("results");
    if (resultsList.children.length > 0) {
        resultsList.style.display = "block"; // Mostra novamente se houver sugestões
    }
});


// Função para exibir uma mensagem de erro.
function displayError(error) {
    // Obtém o elemento com ID 'result'.
    let resultDiv = document.getElementById('result');
    // Define o innerHTML do elemento result para exibir a mensagem de erro em vermelho.
    resultDiv.innerHTML = `<p style="color: red;">${error}</p>`;
}


function displayResult(data) {
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = ''; // Limpa resultados anteriores

    if (!data || !data.Search || data.Search.length === 0) {
        resultsList.innerHTML = '<li>Nenhum filme encontrado.</li>';
        return;
    }

    data.Search.forEach(movie => {
        let li = document.createElement('li');

        li.innerHTML = `
            <strong>${movie.Title} (${movie.Year})</strong><br>
            <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" alt="${movie.Title}" width="50">
        `;

        li.onclick = function () {
            resultsList.style.display = "none";
            getMovieDetails(movie.imdbID);
        }

        resultsList.appendChild(li);
    });

    resultsList.style.display = "block";
}

function getMovieDetails(imdbID) {
    fetch(`/api/buscar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imdbID }),
    })
        .then(response => response.json())
        .then(data => {
            displayMovieDetails(data);
        })
        .catch(error => console.error('Erro ao buscar detalhes:', error));
}


// Função para exibir os dados do filme principal.
function displayMovieDetails(data) {
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    let fragment = document.createDocumentFragment();

    // Informações SEMPRE visíveis
    const alwaysVisible = [
        { tag: 'h2', text: `Filme: ${data.Title}` },
        { tag: 'p', text: `Ano: ${data.Year}` },
        { tag: 'p', text: `Classificação: ${data.Rated}` },
        { tag: 'p', text: `Lançado: ${data.Released}` },
        { tag: 'p', text: `Duração: ${data.Runtime}` },
        { tag: 'p', text: `Gênero: ${data.Genre}` },
        { tag: 'p', text: `Diretor: ${data.Director}` },
        { tag: 'p', text: `Escritor: ${data.Writer}` },
        { tag: 'p', text: `Atores: ${data.Actors}` },
        { tag: 'p', text: `Enredo: ${data.Plot}` },
        { tag: 'p', text: `Idioma: ${data.Language}` },
        { tag: 'p', text: `País: ${data.Country}` }
    ];

    alwaysVisible.forEach(element => {
        let el = document.createElement(element.tag);
        el.innerHTML = `<strong>${element.text.split(':')[0]}:</strong> ${element.text.split(':')[1]}`;
        fragment.appendChild(el);
    });

    // Imagem (Pôster)
    const poster = document.createElement('img');
    poster.src = data.Poster;
    poster.alt = `${data.Title} Poster`;
    fragment.appendChild(poster);

    // Informações que aparecem ao clicar no botão "Ver Mais"
    const moreDetails = document.createElement('div');
    moreDetails.id = 'more-details';
    moreDetails.style.display = 'none';

    const hiddenDetails = [
        { tag: 'p', text: `Prêmios: ${data.Awards}` },
        { tag: 'p', text: `Metascore: ${data.Metascore}` },
        { tag: 'p', text: `Avaliação IMDB: ${data.imdbRating}` },
        { tag: 'p', text: `Votos IMDB: ${data.imdbVotes}` },
        { tag: 'p', text: `ID IMDB: ${data.imdbID}` },
        { tag: 'p', text: `Tipo: ${data.Type}` },
        { tag: 'p', text: `Lançamento em DVD: ${data.DVD}` },
        { tag: 'p', text: `Bilheteria: ${data.BoxOffice}` },
        { tag: 'p', text: `Produção: ${data.Production}` },
        { tag: 'p', text: `Website: ${data.Website}` }
    ];

    hiddenDetails.forEach(element => {
        let el = document.createElement(element.tag);
        el.innerHTML = `<strong>${element.text.split(':')[0]}:</strong> ${element.text.split(':')[1]}`;
        moreDetails.appendChild(el);
    });

    // Botão "Ver Mais"
    const moreButton = document.createElement('button');
    moreButton.textContent = "Ver Mais";
    moreButton.addEventListener('click', () => {
        moreDetails.style.display = moreDetails.style.display === 'none' ? 'block' : 'none';
        moreButton.textContent = moreDetails.style.display === 'none' ? 'Ver Mais' : 'Ver Menos';
    });

    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = "Favoritar";
    favoriteButton.addEventListener('click', () => {
        addFavorite(data);
        displayFavorites();
    });

    // Adicionando ao DOM
    fragment.appendChild(moreButton);
    fragment.appendChild(favoriteButton);
    fragment.appendChild(moreDetails);
    resultDiv.appendChild(fragment);
}

