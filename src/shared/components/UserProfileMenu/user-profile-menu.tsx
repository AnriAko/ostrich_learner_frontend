// src/components/UserProfileMenu/user-profile-menu.tsx

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./user-navigation-styles.css";
import { useUser } from "../../context/user-context/use-user";
import ToggleThemeButton from "./toggle-theme-button";
import ChangeInterfaceLanguageButton from "./change-language-button";
import { Theme } from "../../../features/userConfig/types/theme";
import { useTheme } from "../../context/theme-context/use-theme";
import ToggleThemeIconButton from "./toggle-theme-icon-button";

const UserProfileMenu = () => {
    const { t } = useTranslation();
    const { user, setUser } = useUser();
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    const currentTheme = user?.theme ?? theme;
    const isDark = currentTheme === Theme.dark;

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
        setIsOpen(false);
        navigate("/signin");
    };

    return (
        <div className="flex items-center gap-3" ref={menuRef}>
            <ChangeInterfaceLanguageButton />
            <ToggleThemeIconButton />

            <div
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <div
                    className={`absolute left-0 right-0 top-0 z-0 duration-300 ease-out ${
                        isOpen ? "h-[50px]" : "h-0"
                    }`}
                />

                <div className="relative z-10">
                    <button
                        className={`flex items-center gap-1 px-2 py-1 text-sm w-38 rounded cursor-pointer focus:outline-none font-medium ${
                            isDark
                                ? `${
                                      isOpen ? "bg-gray-700" : ""
                                  } hover:bg-gray-600 text-white`
                                : `${
                                      isOpen ? "bg-gray-200" : ""
                                  } hover:bg-gray-100`
                        }`}
                    >
                        <img
                            src={`src/assets/icons/circle-user-round${
                                isDark ? "_alt" : ""
                            }.svg`}
                            alt={
                                user
                                    ? t("userMenu.profile")
                                    : t("userMenu.menu")
                            }
                            className="w-7 h-7"
                        />
                        <span className="w-auto text-[16px] text-center block">
                            {user ? t("userMenu.profile") : t("userMenu.menu")}
                        </span>
                        <span
                            className={`w-5 h-5 flex items-center justify-center text-sm transition-all duration-200 ${
                                isDark ? "text-gray-300" : "text-gray-500"
                            }`}
                        >
                            {isOpen ? "▲" : "▼"}
                        </span>
                    </button>

                    {isOpen && (
                        <div
                            className={`absolute right-0 mt-2 w-38 rounded-lg shadow-lg z-10 scrollbar-custom overflow-y-auto max-h-60 border ${
                                isDark
                                    ? "bg-gray-800 border-gray-600 text-white"
                                    : "bg-white border-gray-400"
                            }`}
                        >
                            {user ? (
                                <>
                                    <div className="px-4 py-2 font-bold text-sm">
                                        {user.nickname}
                                    </div>
                                    <hr
                                        className={
                                            isDark
                                                ? "border-gray-600"
                                                : "border-gray-400"
                                        }
                                    />

                                    <Link
                                        to="/progress"
                                        className={`block px-4 py-2 text-sm cursor-pointer ${
                                            isDark
                                                ? "hover:bg-gray-700"
                                                : "hover:bg-gray-100"
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t("userMenu.achievements")}
                                    </Link>

                                    <Link
                                        to="/settings"
                                        className={`block px-4 py-2 text-sm cursor-pointer ${
                                            isDark
                                                ? "hover:bg-gray-700"
                                                : "hover:bg-gray-100"
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t("userMenu.settings")}
                                    </Link>

                                    {/* <ToggleThemeButton /> */}

                                    <hr
                                        className={
                                            isDark
                                                ? "border-gray-600"
                                                : "border-gray-400"
                                        }
                                    />

                                    <button
                                        onClick={handleLogout}
                                        className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${
                                            isDark
                                                ? "text-red-400 hover:bg-red-900"
                                                : "text-red-600 hover:bg-red-100"
                                        }`}
                                    >
                                        {t("userMenu.logout")}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <ToggleThemeButton />
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Always visible language switch button next to profile dropdown */}
        </div>
    );
};

export default UserProfileMenu;
