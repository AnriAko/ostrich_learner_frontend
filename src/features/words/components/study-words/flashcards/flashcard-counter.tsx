import React from "react";
import { useTranslation } from "react-i18next";

interface FlashcardCounterProps {
    learned: number;
    total: number;
}

export const FlashcardCounter: React.FC<FlashcardCounterProps> = ({
    learned,
    total,
}) => {
    const { t } = useTranslation();
    return (
        <div className="mb-2 text-sm text-gray-500 dark:text-gray-300">
            {t("flashcards.counterWithLearned", { learned, total })}
        </div>
    );
};
