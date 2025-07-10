import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ToggleThemeButton from "./toggle-theme-button";
import { User } from "../../../../features/user-config/types/user";

interface Props {
    isDark: boolean;
    user: User | null;
    onLogout: () => void;
    closeMenu: () => void;
}

const UserProfileDropdownMenu: FC<Props> = ({
    isDark,
    user,
    onLogout,
    closeMenu,
}) => {
    const { t } = useTranslation();

    return (
        <div
            className={`absolute right-0 mt-2 w-38 rounded-lg shadow-lg z-10 scrollbar-custom overflow-y-auto max-h-60 border ${
                isDark
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-400"
            }`}
        >
            {user ? (
                <>
                    <div
                        className="px-4 py-2 font-bold text-sm max-w-full truncate"
                        title={user.nickname}
                    >
                        {user.nickname}
                    </div>

                    <hr
                        className={
                            isDark ? "border-gray-600" : "border-gray-400"
                        }
                    />

                    <Link
                        to="/achievements"
                        className={`block px-4 py-2 text-sm cursor-pointer ${
                            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                        onClick={closeMenu}
                    >
                        {t("userMenu.achievements")}
                    </Link>

                    <Link
                        to="/settings"
                        className={`block px-4 py-2 text-sm cursor-pointer ${
                            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                        onClick={closeMenu}
                    >
                        {t("userMenu.settings")}
                    </Link>

                    <hr
                        className={
                            isDark ? "border-gray-600" : "border-gray-400"
                        }
                    />

                    <button
                        onClick={onLogout}
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
                <ToggleThemeButton />
            )}
        </div>
    );
};

export default UserProfileDropdownMenu;
