import { Theme } from "../../features/userConfig/types/theme";
import { useTheme } from "../context/theme-context/use-theme";

const Footer = () => {
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;
    console.log("FOOOOTER");

    return (
        <footer
            className={`text-center text-sm p-4 transition-colors duration-300 ${
                isDark ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"
            }`}
        >
            © {new Date().getFullYear()} Ostrich Learner
        </footer>
    );
};

export default Footer;
