import { Link } from "react-router-dom";
// change header color to white and body color to gray 100
const Header = () => (
    <header className="bg-white p-3 font-roboto font-bold">
        <nav className="container mx-auto flex justify-between items-center">
            <Link
                to="/"
                className="font-black text-[22px] text-blue-500 flex flex-col leading-tight"
            >
                <span>Ostrich</span>
                <span>Learner</span>
            </Link>
            <Link to="/profile" className="text-xl">
                Profile
            </Link>
        </nav>
    </header>
);

export default Header;
