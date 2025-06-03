import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";

interface ResultMessageProps {
    showResult: boolean;
    isCorrect: boolean | undefined;
    correctAnswer: string;
}

export default function ResultMessage({
    showResult,
    isCorrect,
    correctAnswer,
}: ResultMessageProps) {
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;
    const { t } = useTranslation();

    let message: string = "";
    let textColor = "";

    if (showResult) {
        if (isCorrect) {
            message = t("tests.Correct!");
            textColor = isDark ? "text-green-400" : "text-green-600";
        } else {
            message = `${t("tests.Incorrect!")} (${t(
                "tests.Correct answer"
            )}: ${correctAnswer})`;
            textColor = isDark ? "text-red-400" : "text-red-600";
        }
    }

    return (
        <div
            className={`h-6 mb-4 text-sm font-semibold transition-colors duration-300 ${
                textColor || "text-transparent"
            }`}
        >
            {message || "\u00A0"}
        </div>
    );
}
