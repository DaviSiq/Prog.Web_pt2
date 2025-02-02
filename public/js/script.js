// Adiciona um event listener ao formulário com o ID 'omdb-form' que "escuta" o evento 'submit'.
// Função para alternar entre modo claro e escuro
document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    
    // Alterar o ícone do botão dependendo do modo
    if (document.body.classList.contains('dark')) {
        document.getElementById('toggle-theme').textContent = '☀️'; // Ícone para o modo claro
    } else {
        document.getElementById('toggle-theme').textContent = '🌙'; // Ícone para o modo escuro
    }
});

// Função de login (para o botão de login)
document.getElementById('login-btn').addEventListener('click', () => {
    window.location.href = '/login';

});

// Adiciona a classe 'light' no body por padrão
document.body.classList.add('light');


document.getElementById('omdb-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let title = document.getElementById('movie-title').value;
    let year = document.getElementById('movie-year').value;
    let type = document.getElementById('movie-type').value;
    let plot = document.getElementById('plot-type').value;

    console.log({ title, year, type, plot }); // Adicionando um log para verificar os dados coletados

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
                fetchSuggestions(title);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});


// Função para exibir uma mensagem de erro.
function displayError(error) {
    // Obtém o elemento com ID 'result'.
    let resultDiv = document.getElementById('result');
    // Define o innerHTML do elemento result para exibir a mensagem de erro em vermelho.
    resultDiv.innerHTML = `<p style="color: red;">${error}</p>`;
}

// Função para exibir os dados do filme principal.
function displayResult(data) {
    console.log("teste")
    let resultDiv = document.getElementById('result');

    resultDiv.innerHTML = '';

    let fragment = document.createDocumentFragment();

    const elements = [
        { tag: 'h2', text: data.Title },
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
        { tag: 'p', text: `País: ${data.Country}` },
        { tag: 'p', text: `Prêmios: ${data.Awards}` },
        { tag: 'img', attributes: { src: data.Poster, alt: `${data.Title} Poster` } },
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

    elements.forEach(({ tag, text, attributes }) => {
        let element = document.createElement(tag);

        if (text) element.textContent = text;

        if (attributes) {
            for (let key in attributes) {
                element.setAttribute(key, attributes[key]);
            }
        }

        fragment.appendChild(element);
    });

    let ratingsDiv = document.createElement('div');
    ratingsDiv.classList.add('rating');
    ratingsDiv.innerHTML = '<h3>Avaliações:</h3>';
    ratingsDiv.style.display = 'flex';
    ratingsDiv.style.flexDirection = 'column';
    ratingsDiv.style.alignItems = 'center';
    ratingsDiv.style.textAlign = 'center';

    data.Ratings.forEach(rating => {
        let ratingP = document.createElement('p');
        ratingP.textContent = `${rating.Source}: ${rating.Value}`;
        ratingsDiv.appendChild(ratingP);
    });

    fragment.appendChild(ratingsDiv);
    resultDiv.appendChild(fragment);
}

// Função para buscar sugestões
function fetchSuggestions(title) {
    console.log("entrou no fetch suggestions")
    fetch('/api/buscar-sugestoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
    })
        .then(response => response.json())
        .then(suggestions => {
            console.log('Sugestões recebidas:', suggestions); // Verifique o que está sendo retornado aqui
            displaySuggestions(suggestions); // Exibe as sugestões
        })
        .catch((error) => {
            console.error('Erro ao buscar sugestões:', error);
        });
}

// Função para exibir as sugestões de filmes
function displaySuggestions(suggestions) {
    let suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = ''; // Limpa as sugestões anteriores

    if (suggestions.length === 0) {
        suggestionsDiv.innerHTML = '<p>Nenhuma sugestão encontrada.</p>';
    } else {
        suggestions.forEach(suggestion => {
            let suggestionDiv = document.createElement('div');
            suggestionDiv.classList.add('suggestion-item');
            
            let suggestionTitle = document.createElement('p');
            suggestionTitle.textContent = suggestion.Title;
            
            let suggestionPoster = document.createElement('img');
            suggestionPoster.setAttribute('src', suggestion.Poster);
            suggestionPoster.setAttribute('alt', `${suggestion.Title} Poster`);
            
            suggestionDiv.appendChild(suggestionTitle);
            suggestionDiv.appendChild(suggestionPoster);
            
            suggestionsDiv.appendChild(suggestionDiv);
        });
    }
}
