import { Link } from "react-router-dom";
import UserProfileMenu from "./UserProfileMenu/user-profile-menu";
import { useUser } from "../hooks/use-user";
import { Theme } from "../../features/userConfig/types/theme";

const Header = () => {
    const { user } = useUser();
    const isDark = user?.theme === Theme.dark;

    return (
        <header className={`${isDark ? "bg-gray-900" : "bg-white"} p-3`}>
            <nav className="container mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className={`font-[900] text-[22px] flex flex-col leading-tight ${
                        isDark ? "text-blue-400" : "text-blue-500"
                    }`}
                >
                    <span>Ostrich</span>
                    <span>Learner</span>
                </Link>
                <UserProfileMenu />
            </nav>
        </header>
    );
};

export default Header;
