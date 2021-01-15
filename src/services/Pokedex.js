const storageName = 'pokemons'

const pushPokemon = (pokemon) => {
    let pokemons = getPokemons();
    let list = pokemons.filter(o => o.nickname === pokemon.nickname);
    if(list.length > 0) {
        return false;
    }
    pokemons.push(pokemon);
    localStorage.setItem(storageName, btoa(JSON.stringify(pokemons)));
    return true;
}

const getPokemons = () => {
    let pokemons = localStorage.getItem(storageName);
    pokemons = (pokemons)?JSON.parse(atob(pokemons)):[];
    return pokemons;
}

const getPokemon = (nickname) => {
    const pokemons = getPokemons();
    let pokemon = pokemons.find(o => o.nickname === nickname);
    return pokemon;
}

const countOwned = (name) => {
    const pokemons = getPokemons();
    let list = pokemons.filter(o => o.name === name);
    return list.length;
}

const removePokemon = (nickname) => {
    let pokemons = getPokemons();
    let list = pokemons.filter(o => o.nickname !== nickname);
    localStorage.setItem(storageName, btoa(JSON.stringify(list)));
}

export {pushPokemon, getPokemons, getPokemon, countOwned, removePokemon};
