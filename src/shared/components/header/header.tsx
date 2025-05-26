// src/shared/components/header/header.tsx

import { Link } from "react-router-dom";
import UserProfileMenu from "./UserProfileMenu/user-profile-menu";
import { useUser } from "../../context/user-context/use-user";
import { Theme } from "../../../features/user-config/types/theme";
import ChangeInterfaceLanguageButton from "./UserProfileMenu/change-language-button";
import { useTheme } from "../../context/theme-context/use-theme";
import ToggleThemeIconButton from "./UserProfileMenu/toggle-theme-icon-button";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";

const Header = ({
    toggleSidebar,
}: {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}) => {
    const { user } = useUser();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const isDark = theme === Theme.dark;

    const textColor = isDark ? "text-yellow-300" : "text-blue-500";
    const buttonTextColor = isDark ? "text-yellow-300" : "text-blue-500";
    const buttonHoverBg = isDark ? "hover:bg-gray-600" : "hover:bg-gray-100";

    return (
        <header className={`${isDark ? "bg-gray-900" : "bg-white"} pt-3 pb-3`}>
            <nav className="flex justify-between items-center px-3">
                <div className="flex items-center">
                    {user && (
                        <button
                            onClick={toggleSidebar}
                            className={`focus:outline-none mr-3 transition-colors duration-200 rounded-md px-1 py-1 ${
                                isDark
                                    ? " hover:bg-gray-700 active:bg-gray-600"
                                    : " hover:bg-gray-100 active:bg-gray-200"
                            } cursor-pointer`}
                            aria-label="Toggle sidebar"
                        >
                            <Menu
                                className={`w-7 h-7 ${
                                    isDark ? "text-yellow-300" : "text-blue-500"
                                }`}
                            />
                        </button>
                    )}

                    <Link
                        to={user ? "/dashboard" : ""}
                        className={`font-[900] text-[22px] flex flex-col leading-tight ml-3 ${textColor}`}
                    >
                        <span className="whitespace-nowrap">
                            {user ? "OL" : "Ostrich Learner"}
                        </span>
                    </Link>
                </div>

                {user ? (
                    <UserProfileMenu />
                ) : (
                    <div className="flex gap-3 items-center">
                        <ChangeInterfaceLanguageButton />
                        <ToggleThemeIconButton />
                        <Link
                            to="/create"
                            className={`px-4 py-2 rounded ${buttonTextColor} ${buttonHoverBg} transition w-24 text-center block`}
                        >
                            {t("createUser.button")}
                        </Link>
                        <Link
                            to="/login"
                            className={`px-4 py-2 rounded ${buttonTextColor} ${buttonHoverBg} transition w-20 text-center block`}
                        >
                            {t("createUser.login")}
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
