import { TestCard, TestPhase } from "./types/test";

export const useTestProgress = (
    currentIndex: number,
    currentCards: TestCard[],
    phase: TestPhase,
    errors: TestCard[]
) => {
    const isLastCardOfPhase = currentIndex === currentCards.length - 1;
    const isFinalCard =
        phase === TestPhase.TranslationToOrigin &&
        isLastCardOfPhase &&
        errors.length === 0;

    const isLastCardCorrect =
        isFinalCard && currentCards[currentIndex]?.isCorrect;

    return { isLastCardOfPhase, isFinalCard, isLastCardCorrect };
};
