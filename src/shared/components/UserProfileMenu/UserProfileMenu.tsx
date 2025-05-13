import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { User } from "../../context/UserTypes";
import "./UserNavigationStyles.css";

const UserProfileMenu = () => {
    const { user, setUser } = useContext(UserContext)!;
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setUser(null);
        setIsOpen(false);
        navigate("/signin");
    };

    const toggleTheme = () => {
        if (!user) return;

        const newTheme: "light" | "dark" =
            user.theme === "light" ? "dark" : "light";
        const updatedUser: User = { ...user, theme: newTheme };

        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    };

    if (!user) return null;

    const themeIcon = user.theme === "light" ? "☀️" : "🌙";

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 focus:outline-none cursor-pointer"
            >
                <img
                    src="src/assets/icons/circle-user-round.svg"
                    alt="User Menu"
                    className="w-8 h-8"
                />
                <span
                    className={`w-5 h-5 flex items-center justify-center text-gray-500 text-sm transition-all duration-200
        ${isOpen ? "bg-gray-200 rounded-full scale-110" : ""}`}
                >
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>

            {isOpen && (
                <div className="absolute font-medium right-0 mt-2 w-56 bg-white border border-gray-400 rounded-lg shadow-lg z-10 scrollbar-custom overflow-y-auto max-h-60">
                    <div className="px-4 py-2 font-bold text-sm">
                        {user.nickname}
                    </div>
                    <hr className="border-gray-400" />
                    <Link
                        to="/progress"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                    >
                        Progress
                    </Link>
                    <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                    >
                        Settings
                    </Link>

                    <button
                        onClick={toggleTheme}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                    >
                        Theme: {user.theme} {themeIcon}
                    </button>

                    <hr className="border-gray-400" />
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 text-sm cursor-pointer"
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfileMenu;
