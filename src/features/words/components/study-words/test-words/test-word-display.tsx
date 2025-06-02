import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { useTranslation } from "react-i18next";

interface Props {
    word: string;
}

export default function TestWordDisplay({ word }: Props) {
    const { t } = useTranslation();
    const { theme } = useTheme();

    const textClass = theme === "dark" ? "text-white" : "text-gray-800";
    const subTextClass = theme === "dark" ? "text-gray-400" : "text-gray-500";

    return (
        <div className="text-center">
            <p className={`mb-2 ${subTextClass}`}>{t("Translate the word")}</p>
            <h3 className={`text-2xl font-bold ${textClass}`}>{word}</h3>
        </div>
    );
}
