export interface FlashcardProgress {
    currentIndex: number;
    learnedIds: number[];
    flipped: boolean;
    shuffledOrder: number[] | null;
    words: {
        id: number;
        origin: string;
        translation: string;
    }[];
}

const STORAGE_KEY = "study-words";

export const saveFlashcardProgress = (progress: FlashcardProgress): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
        console.warn("Failed to save flashcard progress", e);
    }
};

export const loadFlashcardProgress = (): FlashcardProgress | null => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as FlashcardProgress;
    } catch (e) {
        console.warn("Failed to load flashcard progress", e);
        return null;
    }
};

export const clearFlashcardProgress = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn("Failed to clear flashcard progress", e);
    }
};
