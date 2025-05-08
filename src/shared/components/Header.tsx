import { Link } from "react-router-dom";

const Header = () => (
    <header className="bg-blue-600 text-white p-4">
        <nav className="container mx-auto flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
        </nav>
    </header>
);

export default Header;
