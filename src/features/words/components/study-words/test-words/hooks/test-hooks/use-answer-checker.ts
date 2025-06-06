import { useCallback } from "react";
import { TestCard, TestPhase, IsCorrectType, TestResult } from "./types/test";
import { useCheckAnswerBackend } from "../api-hooks/use-check-answer";
import { useProcessTestResults } from "../api-hooks/use-send-result";

export const useAnswerChecker = ({
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
    onMistake,
    finalResults,
}: {
    userId: string;
    phase: TestPhase;
    currentCard: TestCard | undefined;
    currentIndex: number;
    currentCards: TestCard[];
    setCardsPhase1: (cards: TestCard[]) => void;
    setCardsPhase2: (cards: TestCard[]) => void;
    setCorrectAnswers: (updater: (prev: number) => number) => void;
    addErrorCard: (card: TestCard) => void;
    removeErrorCard: (card: TestCard) => void;
    setShowResult: (val: boolean) => void;
    errors: TestCard[];
    setPhase: (phase: TestPhase) => void;
    onMistake: (wordId: number) => void;
    finalResults: TestResult[];
}) => {
    const { mutateAsync: checkAnswerBackend } = useCheckAnswerBackend(userId);
    const { mutate: sendResults } = useProcessTestResults();

    return useCallback(
        async (answer: string) => {
            if (!currentCard) return;

            const origin =
                phase === TestPhase.OriginToTranslation
                    ? currentCard.origin
                    : answer;

            const translation =
                phase === TestPhase.OriginToTranslation
                    ? answer
                    : currentCard.origin;

            const result: IsCorrectType = await checkAnswerBackend({
                id: currentCard.id,
                origin,
                translation,
            });

            const updatedCards = [...currentCards];
            updatedCards[currentIndex] = {
                ...currentCard,
                userAnswer: answer,
                isCorrect: result,
            };

            if (phase === TestPhase.OriginToTranslation) {
                setCardsPhase1(updatedCards);
            } else {
                setCardsPhase2(updatedCards);
            }

            const isCorrect =
                result === "directMatch" || result === "userHasThisTranslation";

            if (isCorrect) {
                setCorrectAnswers((prev) => prev + 1);
                removeErrorCard(currentCard);
            } else {
                addErrorCard(currentCard);
                onMistake(currentCard.id);
            }

            const isLastCard = currentIndex === currentCards.length - 1;

            if (
                isLastCard &&
                isCorrect &&
                errors.length === 0 &&
                phase === TestPhase.TranslationToOrigin
            ) {
                sendResults(finalResults);
                setPhase(TestPhase.Completed);
            }

            setShowResult(true);
        },
        [
            checkAnswerBackend,
            currentCard,
            currentIndex,
            currentCards,
            phase,
            setCardsPhase1,
            setCardsPhase2,
            setCorrectAnswers,
            addErrorCard,
            removeErrorCard,
            setShowResult,
            errors,
            setPhase,
            onMistake,
            sendResults,
            finalResults,
        ]
    );
};
