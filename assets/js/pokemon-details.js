document.addEventListener('DOMContentLoaded', function () {
    const pokeNumber = getPokeNumberFromUrl();
    getPokemonDetails(pokeNumber)
        .then(loadPokemonDetails)
});

function getPokeNumberFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function getPokemonDetails(pokeNumber) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`;
    return fetch(url)
        .then(response => response.json())
        .then((pokeDetail) => {
            // Converte os detalhes do Pokémon usando a função
            return pokemon = convertPokeAPIDetailtoPokemon(pokeDetail)
        });
}

function loadPokemonDetails(pokemon) {
    const pokemonDetailsContainer = document.getElementById('pokemonDetails');
    
    pokemonDetailsContainer.innerHTML = `
        <div class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img
                    src="${pokemon.photo}"
                    alt="${pokemon.name} svg">    
            </div>
        </div>
    `;
}
