import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";
import { FlashcardButtons } from "./flashcard-action";
import {
    useFlashcardsButtons,
    FlashcardStateSnapshot,
    fromProgressToSnapshot,
    fromSnapshotToProgress,
} from "./hooks/use-flashcards";
import { FlashcardCounter } from "./flashcard-counter";

import {
    loadFlashcardProgress,
    saveFlashcardProgress,
    clearFlashcardProgress,
} from "./localStorage/local-storage-flashcards";
import { WordDto } from "../../../dto/word.dto";

interface FlashcardTrainerProps {
    words: WordDto[];
    onClose: () => void;
}

export const FlashcardTrainer: React.FC<FlashcardTrainerProps> = ({
    words,
    onClose,
}) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const [initialStateLoaded, setInitialStateLoaded] = useState(false);

    const {
        current,
        flipped,
        allLearned,
        learnedCount,
        totalCount,
        markAsLearned,
        skip,
        reshuffle,
        goToNext,
        goToPrev,
        setFlipped,
        isShuffled,
        setStateFromExternal,
        getStateSnapshot,
    } = useFlashcardsButtons(words);

    useEffect(() => {
        if (initialStateLoaded) return;

        const saved = loadFlashcardProgress();

        if (
            saved &&
            saved.words &&
            saved.words.length === words.length &&
            saved.words.every((w, i) => w.id === words[i].id)
        ) {
            const snapshot = fromProgressToSnapshot(
                saved
            ) as FlashcardStateSnapshot;
            setStateFromExternal(snapshot);
        } else {
            clearFlashcardProgress();
        }
        setInitialStateLoaded(true);
    }, [words, initialStateLoaded, setStateFromExternal]);

    useEffect(() => {
        if (!initialStateLoaded) return;
        const snapshot = getStateSnapshot();
        const progress = fromSnapshotToProgress(snapshot);
        saveFlashcardProgress(progress);
    }, [
        current,
        flipped,
        learnedCount,
        allLearned,
        isShuffled,
        getStateSnapshot,
        initialStateLoaded,
    ]);

    const cardFrontBack = isDark
        ? "bg-gray-900 text-gray-200"
        : "bg-gray-200 text-gray-800";

    useEffect(() => {
        if (allLearned) {
            clearFlashcardProgress();
        }
    }, [allLearned]);

    if (allLearned) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                    🎉 {t("flashcards.allLearned")}
                </h2>
                <button
                    onClick={() => {
                        onClose();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    {t("flashcards.close")}
                </button>
            </div>
        );
    }

    return (
        <div
            className={`p-6 rounded-xl shadow-lg w-96 ${
                isDark ? "bg-gray-800" : "bg-gray-200"
            }`}
            style={{ alignSelf: "flex-start" }}
        >
            <button
                onClick={() => {
                    const snapshot = getStateSnapshot();
                    const progress = fromSnapshotToProgress(snapshot);
                    saveFlashcardProgress(progress);
                    onClose();
                }}
                className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
                ←
            </button>

            <FlashcardCounter learned={learnedCount} total={totalCount} />

            <div className="perspective w-full h-52 mb-4">
                <div
                    className={`transition-transform duration-400 transform preserve-3d relative w-full h-full rounded-xl shadow-lg cursor-pointer ${
                        flipped ? "rotate-x-180" : ""
                    }`}
                    onClick={() => setFlipped(!flipped)}
                >
                    <div
                        className={`absolute w-full h-full flex items-center justify-center text-xl font-medium backface-hidden rounded-xl ${cardFrontBack}`}
                    >
                        {current.origin}
                    </div>
                    <div
                        className={`absolute w-full h-full flex items-center justify-center text-xl font-medium backface-hidden rotate-x-180 rounded-xl ${cardFrontBack}`}
                    >
                        {current.translation}
                    </div>
                </div>
            </div>

            <FlashcardButtons
                onMarkAsLearned={markAsLearned}
                onSkip={skip}
                onReshuffle={reshuffle}
                onNext={goToNext}
                onPrev={goToPrev}
                isShuffled={isShuffled}
            />
        </div>
    );
};
