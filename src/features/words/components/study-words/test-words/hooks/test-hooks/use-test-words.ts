import { useCallback, useEffect, useMemo, useState } from "react";
import { WordDto } from "../../../../../dto/word.dto";
import { TestPhase, TestResult } from "./types/test";
import { extractLangs } from "./utils/langUtils";
import { shuffleArray } from "./utils/testUtils";

import { useTestPhaseCards } from "./use-test-phase-cards";
import { useErrorManager } from "./use-error-manager";
import { useTestProgress } from "./use-test-progress";
import { useAnswerChecker } from "./use-answer-checker";

import { useUser } from "../../../../../../../shared/context/user-context/use-user";

export const useWordTest = (words: WordDto[], limit: number) => {
    const { user } = useUser();
    const userId = user!.userId;

    const effectiveLimit = useMemo(() => {
        return limit === -1 ? words.length : Math.min(limit, words.length);
    }, [limit, words.length]);

    const [phase, setPhase] = useState<TestPhase>(
        TestPhase.OriginToTranslation
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [totalCards, setTotalCards] = useState(0);
    const [finalResults, setFinalResults] = useState<TestResult[]>([]);

    const {
        cardsPhase1,
        setCardsPhase1,
        cardsPhase2,
        setCardsPhase2,
        initializeCards,
    } = useTestPhaseCards(words, effectiveLimit, setPhase);

    const { errors, addErrorCard, removeErrorCard } = useErrorManager();

    useEffect(() => {
        initializeCards();
        setCurrentIndex(0);
        setCorrectAnswers(0);
        setTotalCards(effectiveLimit * 2);

        const initialFinalResults: TestResult[] = words
            .slice(0, effectiveLimit)
            .map((w) => ({
                id: w.id,
                isMistaken: false,
            }));
        setFinalResults(initialFinalResults);
    }, [initializeCards, effectiveLimit, words]);

    const currentCards =
        phase === TestPhase.OriginToTranslation ? cardsPhase1 : cardsPhase2;
    const currentCard = currentCards[currentIndex];

    const { originLang, targetLang } = currentCard?.vocabularyName
        ? extractLangs(currentCard.vocabularyName, phase)
        : { originLang: "", targetLang: "" };

    const markMistakeInResults = (wordId: number) => {
        setFinalResults((prev) =>
            prev.map((entry) =>
                entry.id === wordId ? { ...entry, isMistaken: true } : entry
            )
        );
    };

    const checkAnswer = useAnswerChecker({
        userId,
        phase,
        currentCard,
        currentIndex,
        currentCards,
        setCardsPhase1,
        setCardsPhase2,
        setCorrectAnswers,
        addErrorCard,
        removeErrorCard,
        setShowResult,
        errors,
        setPhase,
        onMistake: markMistakeInResults,
        finalResults,
    });

    const continueTest = useCallback(() => {
        setShowResult(false);

        if (currentIndex + 1 < currentCards.length) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            if (errors.length > 0) {
                const shuffledErrors = shuffleArray(errors);
                if (phase === TestPhase.OriginToTranslation) {
                    setCardsPhase1(shuffledErrors);
                } else {
                    setCardsPhase2(shuffledErrors);
                }
                setCurrentIndex(0);
            } else {
                if (phase === TestPhase.OriginToTranslation) {
                    setPhase(TestPhase.TranslationToOrigin);
                    setCurrentIndex(0);
                } else {
                    setPhase(TestPhase.Completed);
                }
            }
        }
    }, [
        currentIndex,
        currentCards.length,
        errors,
        phase,
        setCardsPhase1,
        setCardsPhase2,
    ]);

    const { isFinalCard, isLastCardCorrect } = useTestProgress(
        currentIndex,
        currentCards,
        phase,
        errors
    );
    const isTestFinished = phase === TestPhase.Completed;

    return {
        phase,
        currentCard,
        showResult,
        checkAnswer,
        continueTest,
        correctAnswers,
        total: totalCards,
        errors,
        originLang,
        targetLang,
        isFinalCard,
        isLastCardCorrect,
        isTestFinished,
    };
};
