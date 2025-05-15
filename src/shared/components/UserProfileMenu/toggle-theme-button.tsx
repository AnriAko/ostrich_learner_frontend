import { useUpdateUserTheme } from "../../../features/userConfig/hooks/use-user-config";
import { Theme } from "../../../features/userConfig/types/theme";
import { useUser } from "../../hooks/use-user";
import { UserConfig } from "../../../features/userConfig/types/user-config";
import { useTranslation } from "react-i18next";

const ToggleThemeButton = () => {
    const { t } = useTranslation();
    const { mutateAsync } = useUpdateUserTheme();
    const { user } = useUser();

    if (!user) return null;

    const themeIconMap: Record<Theme, string> = {
        light: "☀️",
        dark: "🌙",
    };

    const themeLabelMap: Record<Theme, string> = {
        light: t("userMenu.theme.light"),
        dark: t("userMenu.theme.dark"),
    };

    const handleToggleTheme = async () => {
        if (!user) return;
        const newTheme: Theme =
            user.theme === Theme.light ? Theme.dark : Theme.light;
        const updatedUser: UserConfig = { ...user, theme: newTheme };
        await mutateAsync({ userId: user.userId, theme: updatedUser.theme });
    };

    const isDark = user.theme === Theme.dark;

    return (
        <button
            onClick={handleToggleTheme}
            className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${
                isDark ? "hover:bg-gray-700 text-white" : "hover:bg-gray-100"
            }`}
        >
            {t("userMenu.theme")}: {themeLabelMap[user.theme]}{" "}
            {themeIconMap[user.theme]}
        </button>
    );
};

export default ToggleThemeButton;
