import { Link } from "react-router-dom";
import UserProfileMenu from "../UserProfileMenu/user-profile-menu";
import { useUser } from "../../context/user-context/use-user";
import { Theme } from "../../../features/userConfig/types/theme";
import ChangeInterfaceLanguageButton from "../UserProfileMenu/change-language-button";
import { useTheme } from "../../context/theme-context/use-theme";
import ToggleThemeIconButton from "../UserProfileMenu/toggle-theme-icon-button";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { user } = useUser();

    const { theme } = useTheme();

    const { t } = useTranslation();

    const isDark = theme === Theme.dark;

    const textColor = isDark ? "text-yellow-300" : "text-blue-500";
    const buttonTextColor = isDark ? "text-yellow-300" : "text-blue-500";
    const buttonHoverBg = isDark ? "hover:bg-gray-600" : "hover:bg-gray-100";

    return (
        <header className={`${isDark ? "bg-gray-900" : "bg-white"} p-3`}>
            <nav className="container mx-auto flex justify-between items-center pl-6 pr-6">
                <Link
                    to="/"
                    className={`font-[900] text-[22px] flex flex-col leading-tight ${textColor}`}
                >
                    <span>Ostrich Learner</span>
                </Link>

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
                            to="/signin"
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
