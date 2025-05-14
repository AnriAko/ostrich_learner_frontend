import { useUpdateUserTheme } from "../../../features/userConfig/hooks/use-user-config";
import { Theme } from "../../../features/userConfig/types/theme";
import { useUser } from "../../hooks/use-user";
import { UserConfig } from "../../../features/userConfig/types/user-config";

const ToggleThemeButton = () => {
    const { mutateAsync } = useUpdateUserTheme();
    const { user } = useUser();
    if (!user) {
        return null;
    }
    const themeIcon = user.theme === "light" ? "☀️" : "🌙";

    const handleToggleTheme = async () => {
        if (!user) return;
        const newTheme: Theme =
            user.theme === Theme.light ? Theme.dark : Theme.light;
        const updatedUser: UserConfig = { ...user, theme: newTheme };
        mutateAsync({ userId: user.userId, theme: updatedUser.theme });
    };
    return (
        <button
            onClick={handleToggleTheme}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
        >
            Theme: {user.theme} {themeIcon}
        </button>
    );
};

export default ToggleThemeButton;
