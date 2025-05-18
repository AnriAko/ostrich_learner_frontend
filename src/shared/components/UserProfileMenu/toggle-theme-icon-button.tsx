import { useUpdateUserTheme } from "../../../features/userConfig/hooks/use-user-config";
import { Theme } from "../../../features/userConfig/types/theme";
import { useUser } from "../../context/user-context/use-user";
import { useTheme } from "../../context/theme-context/use-theme";

const LOCAL_STORAGE_KEY = "theme";

const ToggleThemeIconButton = () => {
    const { mutateAsync } = useUpdateUserTheme();
    const { user } = useUser();
    const { theme, setTheme } = useTheme();
    const ALT_SUN = "Light mode";
    const ALT_MOON = "Dark mode";
    const sunIconSrc = "src/assets/icons/sun.svg";
    const moonIconSrc = "src/assets/icons/moon.svg";

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
            className={`p-2 rounded focus:outline-none transition
            ${isDark ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
            aria-label={isDark ? ALT_MOON : ALT_SUN}
            title={isDark ? ALT_MOON : ALT_SUN}
        >
            <img
                src={isDark ? moonIconSrc : sunIconSrc}
                alt={isDark ? ALT_MOON : ALT_SUN}
                className="w-7 h-7"
            />
        </button>
    );
};

export default ToggleThemeIconButton;
