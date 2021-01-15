import React from "react";
import {Link} from "react-router-dom";
import {getPokemons, removePokemon} from "../services/Pokedex";
const MyPokemon = () => {
    const [pokemons, setPokemons] = React.useState(getPokemons());
    const remove = (nickname) => {
        removePokemon(nickname);
        setPokemons((getPokemons));
    }
    return (
        <div className="card-container py-6">
            {pokemons.map((pokemon, id) => (
                <div className="w-6/12 xl:w-3/12 lg:w-4/12 lg:px-4 px-2 xl:mb-8 mb-4" key={id}>
                    <div className="card">
                        <Link to={`/detail/${pokemon.name}`} className="text-center p-4">
                            <div className="w-full">
                                <span className="font-semibold text-xl text-gray-800 uppercase">{pokemon.name}</span>
                                <img src={pokemon.sprites.front_default} className="m-auto object-contain object-center w-32 h-32" alt=""/>
                                <p className="text-xl text-gray-800">Nickname : {pokemon.nickname}</p>
                            </div>
                        </Link>
                        <button className="mb-4 text-white bg-pk-danger block m-auto rounded-lg font-bold uppercase px-6 py-1 text-sm outline-none focus:outline-none" type="button" style={{ transition: "all .15s ease" }}
                                onClick={() => remove(pokemon.nickname)}>release</button>
                    </div>
                </div>
            ))}
            {(pokemons.length === 0)? <p className="text-center w-full font-semibold text-xl text-gray-800 py-16">No pokemon on your pocket!</p>:null}
        </div>
    );
}
export default MyPokemon;
