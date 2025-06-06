import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";
import { IsCorrectType } from "./hooks/test-hooks/types/test";

interface ResultMessageProps {
    showResult: boolean;
    isCorrect: IsCorrectType | undefined;
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

    let message = "";
    let textColor = "";

    if (showResult && isCorrect) {
        switch (isCorrect) {
            case "directMatch":
                message = t("tests.Correct!");
                textColor = isDark ? "text-green-400" : "text-green-600";
                break;
            case "userHasThisTranslation":
                message = `${t(
                    "tests.Has this translation, but expected"
                )}: ${correctAnswer}`;
                textColor = isDark ? "text-yellow-400" : "text-yellow-600";
                break;
            case "noMatch":
                message = `${t("tests.Incorrect!")} (${t(
                    "tests.Correct answer"
                )}: ${correctAnswer})`;
                textColor = isDark ? "text-red-400" : "text-red-600";
                break;
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
