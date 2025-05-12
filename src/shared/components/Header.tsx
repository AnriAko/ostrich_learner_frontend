import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const Header = () => (
    <header className="bg-white p-3 font-roboto font-bold">
        <nav className="container mx-auto flex justify-between items-center">
            <Link
                to="/"
                className="font-roboto font-black text-[22px] text-blue-500 flex flex-col leading-tight"
            >
                <span>Ostrich</span>
                <span>Learner</span>
            </Link>
            <UserMenu />
        </nav>
    </header>
);

export default Header;
