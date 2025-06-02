import { WordTestSnapshot } from "../hooks/use-test-words";

const TEST_STORAGE_KEY = "word-test-progress";

export const saveTestProgress = (progress: WordTestSnapshot): void => {
    try {
        localStorage.setItem(TEST_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
        console.warn("Failed to save word test progress", e);
    }
};

export const loadTestProgress = (): WordTestSnapshot | null => {
    try {
        const raw = localStorage.getItem(TEST_STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as WordTestSnapshot;
    } catch (e) {
        console.warn("Failed to load test progress", e);
        return null;
    }
};

export const clearTestProgress = (): void => {
    try {
        localStorage.removeItem(TEST_STORAGE_KEY);
    } catch (e) {
        console.warn("Failed to clear test progress", e);
    }
};
