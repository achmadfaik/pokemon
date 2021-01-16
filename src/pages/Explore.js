import React from "react";
import {Link} from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import {countOwned} from "../services/Pokedex";

const POKEMONS = gql`query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    next
    previous
    nextOffset
    prevOffset
    status
    message
    results {
      id
      name
      image
    }
  }
}`

const Explore = () => {
    const [buttonLoading, setButtonLoading] = React.useState(false);
    const { loading, error, data, fetchMore } = useQuery(POKEMONS, {
        variables: {
            offset: 0
        }
    });
    const loadMore = () => {
        setButtonLoading(true);
        const {nextOffset} =  data.pokemons;
        fetchMore({
            variables: {offset: nextOffset},
            updateQuery: (prevResult, { fetchMoreResult }) => {
                fetchMoreResult.pokemons.results = [
                    ...prevResult.pokemons.results,
                    ...fetchMoreResult.pokemons.results,
                ];
                setButtonLoading(false);
                return fetchMoreResult;
            }
        });
    }
    if(loading) return <p className="text-center w-full font-semibold text-xl text-gray-800 py-16">Loading ...</p>
    if(error) return <p className="text-center w-full font-semibold text-xl text-gray-800 py-16">Opps, something when wrong!</p>
    return (
        <div className="card-container py-6">
            {data.pokemons.results.map((pokemon) => (
                <Link to={`/detail/${pokemon.name}`} className="w-6/12 xl:w-3/12 lg:w-4/12 lg:px-4 px-2 xl:mb-8 mb-4" key={pokemon.id}>
                    <div className="card">
                        <div className="text-center p-4">
                            <div className="w-full">
                                <span className="font-semibold text-xl text-gray-800 uppercase">{pokemon.name}</span>
                                <img src={pokemon.image} className="m-auto object-contain object-center w-32 h-32" alt=""/>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                <span className="text-green-500 mr-2">Owned</span><span className="whitespace-no-wrap">{ countOwned(pokemon.name)}</span>
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
            {(data)
                ?
                <div className="w-full flex">
                    <button type="button" onClick={loadMore} disabled={buttonLoading} className="btn btn-green px-16 lg:inline-block block m-auto outline-none focus:outline-none" style={{ transition: "all .15s ease" }}>
                        {(buttonLoading)? 'Loading ...' : 'Load more'}
                    </button>
                </div>
                :
                ''
            }
        </div>
    );
}
export default Explore;
