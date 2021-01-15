import React from "react";
import {Link} from "react-router-dom";

export default function Navbar() {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link to="/"><img src="images/pokemon.svg" alt=""/></Link>
                        <button className="navbar-btn block lg:hidden outline-none focus:outline-none" type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}>
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                    <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")}>
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="nav-item">
                                <Link to="/" onClick={() => setNavbarOpen(false)} className="item-link hover:opacity-75">
                                    <i className="fas fa-home text-lg leading-lg opacity-75"></i><span className="ml-2">Home</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/explore" onClick={() => setNavbarOpen(false)} className="item-link hover:opacity-75">
                                    <i className="fas fa-search text-lg leading-lg opacity-75"></i><span className="ml-2">Explore Pokemon</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/my-pokemon" onClick={() => setNavbarOpen(false)} className="item-link hover:opacity-75">
                                    <i className="fas fa-briefcase text-lg leading-lg opacity-75"></i><span className="ml-2">My Pokomen</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
