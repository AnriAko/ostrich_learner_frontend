// src/features/words/components/study-words/study-page.tsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlashcardTrainer } from "./flashcards/flashcard-page";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../user-config/types/theme";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../../shared/context/user-context/use-user";
import {
    useGetAvailableForLearning,
    useGetWordsForRepetition,
} from "../../hooks/use-word";
import { WordDto } from "../../dto/word.dto";
import { FlashcardActions } from "./study-page-action";
import { loadFlashcardProgress } from "./flashcards/localStorage/local-storage-flashcards";
import "./flashcard-style.css";
import TestWordsPage from "./test-words/test-words-page";

type StudyMode = "flashcard" | "test";

interface StudyState {
    words: WordDto[];
    mode: StudyMode;
}

export const StudyPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { user } = useUser();
    const isDark = theme === Theme.dark;

    const state = location.state as StudyState | undefined;
    const mode = state?.mode;
    const wordsFromLocation = state?.words;

    const [continueWords, setContinueWords] = useState<WordDto[] | null>(null);

    const { data: availableWords = [], isLoading: isLoadingAvailable } =
        useGetAvailableForLearning(user?.userId ?? "");
    const { data: repetitionWords = [], isLoading: isLoadingRepetition } =
        useGetWordsForRepetition(user?.userId ?? "");

    console.log(availableWords);

    const isInitialLoading = isLoadingAvailable || isLoadingRepetition;

    const navigateWithWords = (words: WordDto[], mode: StudyMode) => {
        navigate("/dashboard/study", {
            state: { words, mode },
        });
    };

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
        } else {
            setContinueWords(null);
        }
    }, [location]);

    return (
        <div className={`p-6 h-full ${isDark ? "bg-gray-900" : "bg-gray-200"}`}>
            <h1
                className={`text-xl font-bold mb-6 ${
                    isDark ? "text-yellow-300" : "text-blue-600"
                }`}
            >
                {t("flashcards.studyWords")}
            </h1>

            {wordsFromLocation?.length ? (
                mode === "flashcard" ? (
                    <FlashcardTrainer
                        words={wordsFromLocation}
                        onClose={() => navigate(-1)}
                    />
                ) : mode === "test" ? (
                    <TestWordsPage
                        words={wordsFromLocation}
                        onClose={() => navigate(-1)}
                    />
                ) : (
                    <p className="text-red-500">Unknown mode</p>
                )
            ) : isInitialLoading ? (
                <p className="text-gray-800 dark:text-gray-200">
                    {t("flashcards.loading")}
                </p>
            ) : (
                <FlashcardActions
                    isDark={isDark}
                    availableWords={availableWords}
                    repetitionWords={repetitionWords}
                    onStudyNew={() =>
                        navigateWithWords(availableWords, "flashcard")
                    }
                    onRepeatOld={() =>
                        navigateWithWords(repetitionWords, "flashcard")
                    }
                    onChooseWords={() => navigate("/dashboard/manage")}
                    onContinue={
                        continueWords
                            ? () =>
                                  navigateWithWords(continueWords, "flashcard")
                            : undefined
                    }
                    onTest={(words) => navigateWithWords(words, "test")}
                />
            )}
        </div>
    );
};

export default StudyPage;
