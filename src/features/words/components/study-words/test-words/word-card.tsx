import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";
import { useTranslation } from "react-i18next";

interface WordCardProps {
    word: string;
    originLang: string;
}

export default function WordCard({ word, originLang }: WordCardProps) {
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;
    const { t } = useTranslation();

    return (
        <div
            className={`border p-4 rounded mb-4 ${
                isDark
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-800"
            }`}
        >
            <p className="text-lg font-semibold">
                {t("tests.Word")}: {word} <br />
                <span className="text-sm text-gray-400">
                    ({t(`languages.${originLang}`)})
                </span>
            </p>
        </div>
    );
}
