import { Link } from "react-router-dom";
import UserProfileMenu from "./UserProfileMenu/UserProfileMenu";

const Header = () => (
    <header className="bg-white p-3">
        <nav className="container mx-auto flex justify-between items-center">
            <Link
                to="/"
                className="font-[900] text-[22px] text-blue-500 flex flex-col leading-tight"
            >
                <span>Ostrich</span>
                <span>Learner</span>
            </Link>
            <UserProfileMenu />
        </nav>
    </header>
);

export default Header;
