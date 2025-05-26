import { useUpdateUserTheme } from "../../../../features/user-config/hooks/use-user-config";
import { Theme } from "../../../../features/user-config/types/theme";
import { useUser } from "../../../context/user-context/use-user";
import { useTheme } from "../../../context/theme-context/use-theme";
import { useTranslation } from "react-i18next";

const LOCAL_STORAGE_KEY = "theme";

const ToggleThemeButton = () => {
    const { t } = useTranslation();
    const { mutateAsync } = useUpdateUserTheme();
    const { user } = useUser();
    const { theme, setTheme } = useTheme();

    const themeIconMap: Record<Theme, string> = {
        light: "☀️",
        dark: "🌙",
    };

    const themeLabelMap: Record<Theme, string> = {
        light: t("userMenu.theme.light"),
        dark: t("userMenu.theme.dark"),
    };

    const handleToggleTheme = async () => {
        const newTheme: Theme =
            theme === Theme.light ? Theme.dark : Theme.light;

        if (user) {
            await mutateAsync({ userId: user.userId, theme: newTheme });
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
        }
        setTheme(newTheme);
    };

    const isDark = theme === Theme.dark;

    return (
        <button
            onClick={handleToggleTheme}
            className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${
                isDark ? "hover:bg-gray-700 text-white" : "hover:bg-gray-100"
            }`}
        >
            {t("userMenu.theme")}: {themeLabelMap[theme]} {themeIconMap[theme]}
        </button>
    );
};

export default ToggleThemeButton;
