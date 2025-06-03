import { useEffect, useRef } from "react";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";
import { useTranslation } from "react-i18next";

interface AnswerInputProps {
    userAnswer: string;
    setUserAnswer: (answer: string) => void;
    onCheck: () => void;
    onContinue: () => void;
    showResult: boolean;
    targetLang: string;
}

export default function AnswerInput({
    userAnswer,
    setUserAnswer,
    onCheck,
    onContinue,
    showResult,
    targetLang,
}: AnswerInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;
    const { t } = useTranslation();

    useEffect(() => {
        inputRef.current?.focus();
    }, [showResult]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (showResult) {
                onContinue();
            } else {
                onCheck();
            }
        }
    };

    return (
        <div className="flex gap-2 mb-2">
            <input
                type="text"
                ref={inputRef}
                className={`flex-1 border px-2 py-1 rounded transition-colors duration-300 ${
                    isDark
                        ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                        : "bg-white text-gray-700 border-gray-300 placeholder-gray-500"
                } ${showResult ? "opacity-60" : ""}`}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={`${t("tests.Type your answer")} (${t(
                    `languages.${targetLang}`
                )})`}
                onKeyDown={handleKeyDown}
                readOnly={showResult}
            />
        </div>
    );
}
