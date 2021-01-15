import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="container px-4 mx-auto flex lg:flex-row flex-col block items-center">
            <div className="lg:w-1/3 w-full lg:order-first order-last">
                <p className="md:text-6xl text-3xl lg:py-10 py-4"><b>Find</b> all your favorite Pokemon</p>
                <p className="md:text-2xl text-lg mb-4">You can know the type of Pokemon, its strengths, disadvantages and abilities</p>
                <Link to="/explore" className="btn btn-green px-16 lg:inline-block block lg:m-0 m-auto outline-none focus:outline-none" style={{ transition: "all .15s ease" }}>
                    Explore Pokemon
                </Link>
            </div>
            <div className="lg:w-2/3 w-full flex lg:order-last order-first">
                <img src="images/banner.svg" className="ml-auto lg:mr-0 mr-auto my-auto lg:h-auto h-96" alt=""/>
            </div>
        </div>
    );
}

export default Home;
