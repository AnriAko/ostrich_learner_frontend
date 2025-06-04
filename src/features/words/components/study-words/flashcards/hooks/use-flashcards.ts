import { useState, useMemo, useCallback } from "react";
import { WordDto } from "../../../../dto/word.dto";
import { useNavigate } from "react-router-dom";

export interface CardState {
    id: number;
    origin: string;
    translation: string;
    learned: boolean;
}

export interface FlashcardStateSnapshot {
    cards: CardState[];
    currentIndex: number;
    flipped: boolean;
    isShuffled: boolean;
}

export const useStartFlashcards = (
    cachedData: { data: WordDto[] } | null,
    selectedIds: string[]
) => {
    const navigate = useNavigate();

    const start = useCallback(
        (limit?: number) => {
            if (!cachedData) return;

            let selected = cachedData.data.filter((word) =>
                selectedIds.includes(word.id.toString())
            );

            if (limit !== undefined && limit > 0) {
                selected = selected.slice(0, limit);
            }

            const formatted = selected.map((word) => ({
                id: word.id,
                origin: word.origin,
                translation: word.translation,
            }));

            navigate("/dashboard/study", {
                state: { words: formatted, mode: "flashcard" },
            });
        },
        [cachedData, selectedIds, navigate]
    );

    return start;
};

export const useFlashcardsButtons = (words: WordDto[], limit: number = 50) => {
    const initialCards: CardState[] = useMemo(() => {
        const limitedWords = words.slice(0, limit);
        return limitedWords.map((w) => ({
            id: w.id,
            origin: w.origin,
            translation: w.translation,
            learned: false,
        }));
    }, [words, limit]);

    const [cards, setCards] = useState<CardState[]>(initialCards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);

    const shuffleCards = useCallback((arr: CardState[]) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }, []);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        setFlipped(false);
    }, [cards.length]);

    const markAsLearned = useCallback(() => {
        setCards((prev) => {
            const updated = [...prev];
            updated[currentIndex] = {
                ...updated[currentIndex],
                learned: true,
            };
            return updated;
        });
        goToNext();
    }, [currentIndex, goToNext]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
        setFlipped(false);
    }, [cards.length]);

    const skip = useCallback(() => {
        setCards((prev) => {
            const copy = [...prev];
            const [skippedCard] = copy.splice(currentIndex, 1);
            copy.push(skippedCard);
            return copy;
        });
        setCurrentIndex((prev) => (prev >= cards.length - 1 ? 0 : prev));
        setFlipped(false);
    }, [currentIndex, cards.length]);

    const reshuffle = useCallback(() => {
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
    }, [cards, initialCards, isShuffled, shuffleCards]);

    const learnedCount = useMemo(
        () => cards.filter((c) => c.learned).length,
        [cards]
    );
    const allLearned = learnedCount === cards.length;
    const totalCount = cards.length;
    const current = cards[currentIndex];

    const setStateFromExternal = useCallback(
        (state: FlashcardStateSnapshot) => {
            if (
                !state ||
                !state.cards ||
                state.cards.length !== initialCards.length ||
                !state.cards.every((c, i) => c.id === initialCards[i].id)
            ) {
                setCards(initialCards);
                setCurrentIndex(0);
                setFlipped(false);
                setIsShuffled(false);
                return;
            }

            setCards(state.cards);
            setCurrentIndex(state.currentIndex);
            setFlipped(state.flipped);
            setIsShuffled(state.isShuffled);
        },
        [initialCards]
    );

    const getStateSnapshot = useCallback((): FlashcardStateSnapshot => {
        return {
            cards,
            currentIndex,
            flipped,
            isShuffled,
        };
    }, [cards, currentIndex, flipped, isShuffled]);

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
        setStateFromExternal,
        getStateSnapshot,
    };
};
