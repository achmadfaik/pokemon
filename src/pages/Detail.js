import React from "react";
import { useQuery, gql } from "@apollo/client";
import {pushPokemon} from "../services/Pokedex";

const POKEMON_DETAIL = gql`query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    sprites {
      front_default
    }
    moves {
      move {
        name
      }
    }
    types {
      type {
        name
      }
    }
  }
}`


const Detail = (props) => {
    const [buttonLoading, setButtonLoading] = React.useState(false);
    const [catchStatus, setCatchStatus] = React.useState(false);
    const [errorStatus, setErrorStatus] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [nickname, setNickname] = React.useState('');
    const {name} = props.match.params;
    const { loading, error, data } = useQuery(POKEMON_DETAIL, {
        variables: {
            name: name
        }
    });
    const catchPokemon = () => {
        setCatchStatus(false);
        setButtonLoading(true);
        setTimeout(() => {
            let number = Math.floor(Math.random() * 10) + 1;
            let caught = (number%2===0);
            setCatchStatus(caught);
            setShowModal(true);
            setButtonLoading(false);
        }, 1000);
    }
    const savePokemon = (pokemon) => {
        setErrorStatus(false);
        setButtonLoading(true);
        setTimeout(() => {
            const newPokemon = {
                ...pokemon,
                nickname: nickname
            }
            const pushed = pushPokemon(newPokemon);
            setButtonLoading(false);
            setErrorStatus(!pushed);
            if(pushed) {
                setNickname('');
                setErrorStatus(false);
                setShowModal(false);
            }
        }, 2000);
    }
    if(loading) return <p className="text-center w-full font-semibold text-xl text-gray-800 py-16">Loading ...</p>
    if(error) return <p className="text-center w-full font-semibold text-xl text-gray-800 py-16">Opps, something when wrong!</p>
    return (
        <div className="container px-4 mx-auto lg:flex block py-6">
            <div className="lg:w-1/3 w-full">
                <img src={data.pokemon.sprites.front_default} className="shadow-lg rounded-full max-w-full object-contain object-center w-72 h-72 align-middle bg-white m-auto border-none" alt="..."/>
                <p className="font-semibold text-center pt-6 text-4xl text-gray-800 uppercase">{data.pokemon.name}</p>
                <p className="font-semibold text-center lg:pt-0 pt-6 text-xl uppercase">Types</p>
                <div className="flex flex-wrap items-center justify-center pb-4">
                    {
                        data.pokemon.types.map((type, id) => (
                            <span key={id} className="badges mx-1 mb-2">{ type.type.name}</span>
                        ))
                    }
                </div>
                <div className="flex space-x-4">
                    <button onClick={() => props.history.goBack()} className="px-3 w-full bg-pk-dark text-white btn lg:inline-block block lg:m-0 m-auto outline-none focus:outline-none" type="button" style={{ transition: "all .15s ease" }}>Back</button>
                    <button onClick={catchPokemon} className="px-3 w-full btn btn-green lg:inline-block block lg:m-0 m-auto outline-none focus:outline-none" type="button" style={{ transition: "all .15s ease" }}>
                        {(buttonLoading)? 'catching ...' : 'Catch Pokemon'}
                    </button>
                </div>
            </div>
            <div className="lg:w-2/3 w-full lg:px-16 px-0">
                <p className="font-semibold text-center pb-6 lg:pt-0 pt-6 text-4xl text-gray-800">Moves</p>
                <div className="flex flex-wrap justify-center pb-6">
                    {
                        data.pokemon.moves.map((move, id) => (
                            <span key={id} className="badges last:mr-0 mr-1 mb-2">{ move.move.name }</span>
                        ))
                    }
                </div>
            </div>


            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-72 bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        { (catchStatus) ? 'Catch Success' : 'Catch Failed'}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}><span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <div className="mb-3 pt-0">
                                        { (catchStatus) ?
                                            <input type="text" placeholder="Pokemon Nickname" onChange={(e) => setNickname(e.target.value)} className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"/>
                                            :
                                            'Pokemon gone, try again!'}
                                        {
                                            (errorStatus) ?<span className="text-xs text-red-500">nickname already in use!</span>:null
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="text-white bg-pk-danger rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }}
                                        onClick={() => setShowModal(false)}>Close</button>
                                    { (catchStatus) ?
                                        <button disabled={nickname===''} className={`bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ${nickname===''?'cursor-not-allowed':''}`} type="button" style={{ transition: "all .15s ease" }}
                                            onClick={() => savePokemon(data.pokemon)}>{(buttonLoading)? 'saving ...' : 'Save'}</button>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

        </div>
    );
}
export default Detail;
