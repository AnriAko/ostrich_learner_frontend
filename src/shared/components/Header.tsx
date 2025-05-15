import { Link } from "react-router-dom";
import UserProfileMenu from "./UserProfileMenu/user-profile-menu";
import { useUser } from "../hooks/use-user";
import { Theme } from "../../features/userConfig/types/theme";
import ChangeInterfaceLanguageButton from "./UserProfileMenu/change-language-button";

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

                {user ? (
                    <UserProfileMenu />
                ) : (
                    <div className="flex gap-3">
                        <ChangeInterfaceLanguageButton />
                        <Link
                            to="/create"
                            className="px-4 py-2 rounded border border-blue-500 text-blue-500 hover:bg-blue-50 transition"
                        >
                            Create User
                        </Link>
                        <Link
                            to="/signin"
                            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
