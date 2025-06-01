// src/entities/word/ui/flashcard/components/FlashcardButtons.tsx

import React from "react";
import { Check, X, Shuffle } from "lucide-react";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";
import { useTranslation } from "react-i18next";

interface FlashcardButtonsProps {
    onMarkAsLearned: () => void;
    onSkip: () => void;
    onReshuffle: () => void;
    onNext: () => void;
    onPrev: () => void;
    isShuffled: boolean;
}

export const FlashcardButtons: React.FC<FlashcardButtonsProps> = ({
    onMarkAsLearned,
    onSkip,
    onReshuffle,
    onNext,
    onPrev,
    isShuffled,
}) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const isDark = theme === Theme.dark;

    const buttonStyle = isDark
        ? "bg-yellow-300 text-gray-800"
        : "bg-blue-500 text-gray-200";

    const checkIconColor = isDark ? "text-green-600" : "text-green-300";
    const skipIconColor = isDark ? "text-red-600" : "text-red-500";

    return (
        <div className="flex flex-wrap justify-center gap-3 mt-2">
            <button
                onClick={onPrev}
                title={t("flashcards.previous")}
                aria-label={t("flashcards.previous")}
                className={`px-4 py-2 rounded hover:brightness-110 transition flex items-center justify-center ${buttonStyle}`}
            >
                ←
            </button>

            <button
                onClick={onMarkAsLearned}
                title={t("flashcards.remembered")}
                aria-label={t("flashcards.remembered")}
                className={`px-4 py-2 rounded hover:brightness-110 transition flex items-center justify-center ${buttonStyle}`}
            >
                <Check size={24} className={checkIconColor} />
            </button>
            <button
                onClick={onSkip}
                title={t("flashcards.skip")}
                aria-label={t("flashcards.skip")}
                className={`px-4 py-2 rounded hover:brightness-110 transition flex items-center justify-center ${buttonStyle}`}
            >
                <X size={24} className={skipIconColor} />
            </button>
            <button
                onClick={onReshuffle}
                title={t("flashcards.shuffle")}
                aria-label={t("flashcards.shuffle")}
                className={`px-4 py-2 rounded hover:brightness-110 transition flex items-center justify-center ${
                    isShuffled ? "bg-yellow-500 text-gray-900" : buttonStyle
                }`}
            >
                <Shuffle size={24} />
            </button>

            <button
                onClick={onNext}
                title={t("flashcards.next")}
                aria-label={t("flashcards.next")}
                className={`px-4 py-2 rounded hover:brightness-110 transition flex items-center justify-center ${buttonStyle}`}
            >
                →
            </button>
        </div>
    );
};
