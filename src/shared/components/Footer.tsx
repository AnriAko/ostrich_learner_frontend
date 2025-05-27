import { Theme } from "../../features/user-config/types/theme";
import { useTheme } from "../context/theme-context/use-theme";

const Footer = () => {
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;
    return (
        <footer
            className={`text-center text-sm p-4 ${
                isDark ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
            }`}
        >
            © {new Date().getFullYear()} Ostrich Learner
        </footer>
    );
};

export default Footer;
