import Navbar from "../components/Navbar";
const Layout = ({ children }) => {
    return(
        <div className="bg-gradient min-h-screen">
            <Navbar/>
            <div className="pt-24">
                {children}
            </div>
        </div>
    );
}
export default Layout;
