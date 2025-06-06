import { TestCard } from "../types/test";

export const shuffleArray = (arr: TestCard[]): TestCard[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

export const compareAnswers = (input: string, correct: string): boolean =>
    input.trim().toLowerCase() === correct.trim().toLowerCase();
