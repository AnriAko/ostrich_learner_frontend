// src/features/words/components/study-words/study-page.tsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlashcardPage } from "./flashcards/flashcard-page";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../user-config/types/theme";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../../shared/context/user-context/use-user";
import {
    useGetAvailableForLearning,
    useGetWordsForRepetition,
} from "../../hooks/use-word";
import { WordDto } from "../../dto/word.dto";
import { StudyPageActions } from "./study-page-action";
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
    const [limit, setLimit] = useState<number>(-1); // ✅ добавлено

    const isDark = theme === Theme.dark;

    const state = location.state as StudyState | undefined;
    const mode = state?.mode;
    const wordsFromLocation = state?.words;

    const { data: availableWords = [], isLoading: isLoadingAvailable } =
        useGetAvailableForLearning(user?.userId ?? "");
    const { data: repetitionWords = [], isLoading: isLoadingRepetition } =
        useGetWordsForRepetition(user?.userId ?? "");

    const isInitialLoading = isLoadingAvailable || isLoadingRepetition;

    const navigateWithWords = (words: WordDto[], mode: StudyMode) => {
        navigate("/dashboard/study", {
            state: { words, mode },
        });
    };

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
                    <FlashcardPage
                        words={wordsFromLocation}
                        onClose={() => navigate(-1)}
                    />
                ) : mode === "test" ? (
                    <TestWordsPage words={wordsFromLocation} limit={limit} /> // ✅ limit передаётся
                ) : (
                    <p className="text-red-500">Unknown mode</p>
                )
            ) : isInitialLoading ? (
                <p className="text-gray-800 dark:text-gray-200">
                    {t("flashcards.loading")}
                </p>
            ) : (
                <StudyPageActions
                    isDark={isDark}
                    availableWords={availableWords}
                    repetitionWords={repetitionWords}
                    onStudyNew={(words) =>
                        navigateWithWords(words, "flashcard")
                    }
                    onRepeatOld={(words) =>
                        navigateWithWords(words, "flashcard")
                    }
                    onChooseWords={() => navigate("/dashboard/manage")}
                    onTest={(words) => navigateWithWords(words, "test")}
                    limit={limit} // ✅ передаём limit и setLimit
                    setLimit={setLimit}
                />
            )}
        </div>
    );
};

export default StudyPage;
