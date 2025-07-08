import React from "react";
import { useTranslation } from "react-i18next";
import { Theme } from "../../../../user-config/types/theme";

interface FlashcardCounterProps {
    learned: number;
    total: number;
    theme: Theme;
}

export const FlashcardCounter: React.FC<FlashcardCounterProps> = ({
    learned,
    total,
    theme,
}) => {
    const { t } = useTranslation();

    const isDark = theme === Theme.dark;
    const textColorClass = isDark ? "text-gray-300" : "text-gray-800";

    return (
        <div className={`mb-2 text-sm font-medium ${textColorClass}`}>
            {t("flashcards.counterWithLearned", { learned, total })}
        </div>
    );
};
