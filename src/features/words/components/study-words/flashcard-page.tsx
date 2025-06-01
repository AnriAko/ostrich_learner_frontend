import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlashcardTrainer } from "./flashcard-traine/flashcard-trainer";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../user-config/types/theme";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../../shared/context/user-context/use-user";
import {
    useGetAvailableForLearning,
    useGetWordsForRepetition,
} from "../../hooks/use-word";
import { WordDto } from "../../dto/word.dto";
import { FlashcardActions } from "./flashcard-page-action";
import { loadFlashcardProgress } from "./localStorage/local-storage-flashcards";
import { useStartFlashcards } from "./hooks/use-flashcards";

export const FlashcardPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { user } = useUser();
    const isDark = theme === Theme.dark;

    const wordsFromLocation = location.state?.words as WordDto[] | undefined;

    const [continueWords, setContinueWords] = useState<WordDto[] | null>(null);

    const { data: availableWords = [], isLoading: isLoadingAvailable } =
        useGetAvailableForLearning(user?.userId ?? "");
    const { data: repetitionWords = [], isLoading: isLoadingRepetition } =
        useGetWordsForRepetition(user?.userId ?? "");

    const isInitialLoading = isLoadingAvailable || isLoadingRepetition;

    const startWithAvailable = useStartFlashcards(
        { data: availableWords },
        availableWords.map((w) => w.id.toString())
    );
    const startWithRepetition = useStartFlashcards(
        { data: repetitionWords },
        repetitionWords.map((w) => w.id.toString())
    );

    useEffect(() => {
        const saved = loadFlashcardProgress();
        if (saved && saved.words && saved.words.length > 0) {
            const filled: WordDto[] = saved.words.map((word) => ({
                ...word,
                memoryScore: 0,
                learningDate: null,
                dateForRepetition: null,
                vocabularyId: "",
                vocabularyName: "",
            }));
            setContinueWords(filled);
        }
    }, []);

    const handleContinue = () => {
        if (continueWords) {
            navigate("/dashboard/study", {
                state: { words: continueWords },
            });
        }
    };

    return (
        <div
            className={`p-6 ${
                isDark ? "bg-gray-900" : "bg-gray-200"
            } min-h-100`}
        >
            <h1
                className={`text-xl font-bold mb-6 ${
                    isDark ? "text-yellow-300" : "text-blue-600"
                }`}
            >
                {t("flashcards.studyWords")}
            </h1>

            {wordsFromLocation?.length ? (
                <FlashcardTrainer
                    words={wordsFromLocation}
                    onClose={() => navigate("/dashboard/manage")}
                />
            ) : isInitialLoading ? (
                <p className="text-gray-800 dark:text-gray-200">
                    {t("flashcards.loading")}
                </p>
            ) : (
                <FlashcardActions
                    isDark={isDark}
                    availableWords={availableWords}
                    repetitionWords={repetitionWords}
                    onStudyNew={startWithAvailable}
                    onRepeatOld={startWithRepetition}
                    onChooseWords={() => navigate("/dashboard/manage")}
                    onContinue={
                        continueWords && !wordsFromLocation
                            ? handleContinue
                            : undefined
                    }
                />
            )}
        </div>
    );
};

export default FlashcardPage;
