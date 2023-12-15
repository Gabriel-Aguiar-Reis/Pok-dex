const pokemonList = document.getElementById('PokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 12
let offset = 0
const maxRecords = 151

function openPokemonDetails(pokeNumber) {
    const detailsUrl = `pokemon-details.html?id=${pokeNumber}`;
    window.open(detailsUrl, '_blank');
}

function loadPokemonsItems(offset, limit) {
        pokeAPI.getPokemon(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => 
            `
            <div class="clickable" id="pokemonDetailsDiv" onclick="openPokemonDetails(${pokemon.number})">
                <li class="pokemon ${pokemon.type}">
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
                </li>
            </div>
        `).join('');
    });
}
loadPokemonsItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    qtyRecord = offset + limit
    if (qtyRecord >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonsItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton) 
    } else {
        loadPokemonsItems(offset, limit)
    }
})