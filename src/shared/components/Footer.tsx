import { Theme } from "../../features/user-config/types/theme";
import { useTheme } from "../context/theme-context/use-theme";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;
    const { t } = useTranslation();

    return (
        <footer
            className={`text-center text-sm p-4 ${
                isDark ? "bg-gray-900 text-gray-400" : "bg-white text-gray-600"
            }`}
        >
            <span className="mr-1">© {new Date().getFullYear()}</span>
            <span
                className={`font-semibold ${
                    isDark ? "text-yellow-300" : "text-blue-600"
                }`}
            >
                Ostrich Learner
            </span>
            <span className="ml-1">— {t("common.allRightsReserved")}</span>
        </footer>
    );
};

export default Footer;
