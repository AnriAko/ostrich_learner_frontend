import { useUser } from "../hooks/use-user";
import { Theme } from "../../features/userConfig/types/theme";

const Footer = () => {
    const { user } = useUser();
    const isDark = user?.theme === Theme.dark;

    return (
        <footer
            className={`text-center text-sm p-4 transition-colors duration-300 ${
                isDark
                    ? "bg-gray-900 text-gray-300"
                    : "bg-gray-100 text-gray-700"
            }`}
        >
            © {new Date().getFullYear()} Ostrich Learner
        </footer>
    );
};

export default Footer;
