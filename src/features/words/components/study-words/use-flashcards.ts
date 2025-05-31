import { useState, useMemo } from "react";

export interface CardState {
    id: number;
    origin: string;
    translation: string;
    learned: boolean;
}

export const useFlashcardsButtons = (
    words: { id: number; origin: string; translation: string }[]
) => {
    const initialCards: CardState[] = useMemo(
        () =>
            words.map((w) => ({
                id: w.id,
                origin: w.origin,
                translation: w.translation,
                learned: false,
            })),
        [words]
    );

    const [cards, setCards] = useState<CardState[]>(initialCards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);

    const shuffleCards = (arr: CardState[]) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    const markAsLearned = () => {
        setCards((prev) => {
            const updated = [...prev];
            updated[currentIndex] = {
                ...updated[currentIndex],
                learned: true,
            };
            return updated;
        });
        goToNext();
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        setFlipped(false);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
        setFlipped(false);
    };

    const skip = () => {
        setCards((prev) => {
            const copy = [...prev];
            const [skippedCard] = copy.splice(currentIndex, 1);
            copy.push(skippedCard);
            return copy;
        });
        setCurrentIndex((prev) => (prev >= cards.length - 1 ? 0 : prev));
        setFlipped(false);
    };

    const reshuffle = () => {
        if (!isShuffled) {
            const shuffled = shuffleCards(cards);
            setCards(shuffled);
            setCurrentIndex(0);
            setFlipped(false);
            setIsShuffled(true);
        } else {
            setCards(initialCards);
            setCurrentIndex(0);
            setFlipped(false);
            setIsShuffled(false);
        }
    };

    const learnedCount = cards.filter((c) => c.learned).length;
    const allLearned = learnedCount === cards.length;
    const totalCount = cards.length;
    const current = cards[currentIndex];

    return {
        cards,
        current,
        currentIndex,
        flipped,
        isShuffled,
        markAsLearned,
        goToNext,
        goToPrev,
        skip,
        reshuffle,
        learnedCount,
        allLearned,
        totalCount,
        setFlipped,
    };
};
