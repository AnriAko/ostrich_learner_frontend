import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { User } from "../context/UserTypes";

const UserMenu = () => {
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
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setUser(null);
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
                className="focus:outline-none cursor-pointer"
            >
                <img
                    src="src/assets/icons/circle-user-round.svg"
                    alt="User Menu"
                    className="w-8 h-8"
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-10">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-700">
                        {user.nickname}
                    </div>
                    <hr />
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
                    <hr />
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

export default UserMenu;
