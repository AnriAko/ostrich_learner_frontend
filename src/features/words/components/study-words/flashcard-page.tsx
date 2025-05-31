import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlashcardTrainer } from "./flashcard-trainer";
import "./flashcard-style.css";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../user-config/types/theme";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../../shared/context/user-context/use-user";
import {
    useGetAvailableForLearning,
    useGetWordsForRepetition,
} from "../../hooks/use-word";
import { WordDto } from "../../dto/word.dto";
import { useStartFlashcards } from "./use-flashcards-start";

export const FlashcardPage: React.FC = () => {
    const location = useLocation();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { user } = useUser();
    const navigate = useNavigate();

    const isDark = theme === Theme.dark;
    const parentBg = isDark ? "bg-gray-900" : "bg-gray-200";
    const headingColor = isDark ? "text-yellow-300" : "text-blue-600";

    const wordsFromLocation = location.state?.words as WordDto[] | undefined;

    const { data: availableWords = [], isLoading: isLoadingAvailable } =
        useGetAvailableForLearning(user?.userId ?? "");
    const { data: repetitionWords = [], isLoading: isLoadingRepetition } =
        useGetWordsForRepetition(user?.userId ?? "");

    const isInitialLoading = isLoadingAvailable || isLoadingRepetition;

    // Используем кастомный хук для запуска карточек
    const startWithAvailable = useStartFlashcards(
        { data: availableWords },
        availableWords.map((w) => w.id.toString())
    );

    const startWithRepetition = useStartFlashcards(
        { data: repetitionWords },
        repetitionWords.map((w) => w.id.toString())
    );

    const renderNoWordsUI = () => (
        <div className="mt-2 text-gray-800 dark:text-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
                {availableWords.length > 0 && (
                    <div className="relative inline-block">
                        <button
                            onClick={startWithAvailable}
                            className={`px-4 py-2 rounded transition text-white 
                                ${
                                    isDark
                                        ? "bg-yellow-500 hover:bg-yellow-600"
                                        : "bg-green-500 hover:bg-green-600"
                                }`}
                        >
                            {t("flashcards.studyNewWords")}
                        </button>
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {availableWords.length}
                        </span>
                    </div>
                )}
                {repetitionWords.length > 0 && (
                    <div className="relative inline-block">
                        <button
                            onClick={startWithRepetition}
                            className={`px-4 py-2 rounded transition text-white 
                                ${
                                    isDark
                                        ? "bg-yellow-700 hover:bg-yellow-800"
                                        : "bg-yellow-500 hover:bg-yellow-600"
                                }`}
                        >
                            {t("flashcards.repeatOldWords")}
                        </button>
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {repetitionWords.length}
                        </span>
                    </div>
                )}
                <button
                    onClick={() => navigate("/dashboard/manage")}
                    className={`px-4 py-2 rounded transition text-white 
                        ${
                            isDark
                                ? "bg-blue-700 hover:bg-blue-800"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    {t("flashcards.chooseWords")}
                </button>
            </div>
        </div>
    );

    return (
        <div className={`p-6 ${parentBg} min-h-screen`}>
            <h1 className={`text-3xl font-bold mb-6 ${headingColor}`}>
                {t("flashcards.studyWords")}
            </h1>

            {wordsFromLocation?.length ? (
                <div className="mt-4">
                    <FlashcardTrainer
                        words={wordsFromLocation}
                        onClose={() => navigate("/dashboard/manage")}
                    />
                </div>
            ) : isInitialLoading ? (
                <p className="text-gray-800 dark:text-gray-200">
                    {t("flashcards.loading")}
                </p>
            ) : (
                renderNoWordsUI()
            )}
        </div>
    );
};

export default FlashcardPage;
