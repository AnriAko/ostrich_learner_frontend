import { useCallback, useEffect, useState } from "react";
import { WordDto } from "../../../../dto/word.dto";
import { useNavigate } from "react-router-dom";

export interface TestCard {
    id: number;
    origin: string;
    translation: string;
    vocabularyName: string;
    userAnswer?: string;
    isCorrect?: boolean;
}

export enum TestPhase {
    OriginToTranslation = "OriginToTranslation",
    TranslationToOrigin = "TranslationToOrigin",
    Completed = "Completed",
}

export const useStartTests = (
    cachedData: { data: WordDto[] } | null,
    selectedIds: string[]
) => {
    const navigate = useNavigate();

    const start = useCallback(() => {
        if (!cachedData) return;

        const selectedWords = cachedData.data.filter((word) =>
            selectedIds.includes(word.id.toString())
        );

        navigate("/dashboard/study", {
            state: { words: selectedWords, mode: "test" },
        });
    }, [cachedData, selectedIds, navigate]);

    return start;
};

export const useWordTest = (words: WordDto[], limit: number = 20) => {
    const [phase, setPhase] = useState<TestPhase>(
        TestPhase.OriginToTranslation
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const [cardsPhase1, setCardsPhase1] = useState<TestCard[]>([]);
    const [cardsPhase2, setCardsPhase2] = useState<TestCard[]>([]);
    const [errors, setErrors] = useState<TestCard[]>([]);

    const [totalCards, setTotalCards] = useState(0);

    const shuffleArray = useCallback((arr: TestCard[]) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }, []);

    const initializeCards = useCallback(() => {
        const limitedWords = words.slice(0, limit);

        const phase1Cards = limitedWords.map((w) => ({
            id: w.id,
            origin: w.origin,
            translation: w.translation,
            vocabularyName: w.vocabularyName ?? "unknown",
        }));

        const phase2Cards = limitedWords.map((w) => ({
            id: w.id,
            origin: w.translation,
            translation: w.origin,
            vocabularyName: w.vocabularyName ?? "unknown",
        }));
        console.log(words);

        setCardsPhase1(shuffleArray(phase1Cards));
        setCardsPhase2(shuffleArray(phase2Cards));

        setPhase(TestPhase.OriginToTranslation);
        setCurrentIndex(0);
        setCorrectAnswers(0);
        setErrors([]);

        setTotalCards(limitedWords.length * 2);
    }, [words, limit, shuffleArray]);

    useEffect(() => {
        initializeCards();
    }, [initializeCards]);

    const currentCards =
        phase === TestPhase.OriginToTranslation ? cardsPhase1 : cardsPhase2;
    const currentCard = currentCards[currentIndex];

    let originLang = "";
    let targetLang = "";

    if (currentCard?.vocabularyName) {
        const parts = currentCard.vocabularyName.split("-");
        if (phase === TestPhase.OriginToTranslation) {
            originLang = parts[0] ?? "";
            targetLang = parts[1] ?? "";
        } else {
            originLang = parts[1] ?? "";
            targetLang = parts[0] ?? "";
        }
    }

    const addErrorCard = useCallback((card: TestCard) => {
        setErrors((prev) => {
            if (prev.find((c) => c.id === card.id)) return prev;
            return [...prev, { ...card }];
        });
    }, []);

    const removeErrorCard = useCallback((card: TestCard) => {
        setErrors((prev) => prev.filter((c) => c.id !== card.id));
    }, []);

    const checkAnswer = useCallback(
        (answer: string) => {
            if (!currentCard) return;

            const correctAnswer = currentCard.translation.trim().toLowerCase();
            const isCorrect = correctAnswer === answer.trim().toLowerCase();

            const updatedCards = [...currentCards];
            updatedCards[currentIndex] = {
                ...currentCard,
                userAnswer: answer,
                isCorrect,
            };

            if (phase === TestPhase.OriginToTranslation) {
                setCardsPhase1(updatedCards);
            } else {
                setCardsPhase2(updatedCards);
            }

            if (isCorrect) {
                setCorrectAnswers((prev) => prev + 1);
                removeErrorCard(currentCard);
            } else {
                addErrorCard(currentCard);
            }

            setShowResult(true);
        },
        [
            currentCard,
            currentIndex,
            currentCards,
            phase,
            addErrorCard,
            removeErrorCard,
        ]
    );

    const continueTest = useCallback(() => {
        setShowResult(false);

        if (currentIndex < currentCards.length - 1) {
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
    }, [currentIndex, currentCards.length, errors, phase, shuffleArray]);

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
    };
};
