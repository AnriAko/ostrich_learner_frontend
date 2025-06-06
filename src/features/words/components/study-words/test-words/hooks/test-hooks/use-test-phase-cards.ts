import { useState, useCallback } from "react";
import { WordDto } from "../../../../../dto/word.dto";
import { TestCard, TestPhase } from "./types/test";
import { shuffleArray } from "./utils/testUtils";

export const useTestPhaseCards = (
    words: WordDto[],
    limit: number,
    setPhase: (phase: TestPhase) => void
) => {
    const [cardsPhase1, setCardsPhase1] = useState<TestCard[]>([]);
    const [cardsPhase2, setCardsPhase2] = useState<TestCard[]>([]);

    const initializeCards = useCallback(() => {
        const effectiveLimit = limit === -1 ? words.length : limit;
        const limitedWords = words.slice(0, effectiveLimit);

        const phase1 = limitedWords.map((w) => ({
            id: w.id,
            origin: w.origin,
            translation: w.translation,
            vocabularyName: w.vocabularyName ?? "unknown",
        }));

        const phase2 = limitedWords.map((w) => ({
            id: w.id,
            origin: w.translation,
            translation: w.origin,
            vocabularyName: w.vocabularyName ?? "unknown",
        }));

        setCardsPhase1(shuffleArray(phase1));
        setCardsPhase2(shuffleArray(phase2));
        setPhase(TestPhase.OriginToTranslation);
    }, [words, limit, setPhase]);

    return {
        cardsPhase1,
        setCardsPhase1,
        cardsPhase2,
        setCardsPhase2,
        initializeCards,
    };
};
