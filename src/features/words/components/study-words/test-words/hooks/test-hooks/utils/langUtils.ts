import { TestPhase } from "../types/test";

export const extractLangs = (
    vocabularyName: string,
    phase: TestPhase
): { originLang: string; targetLang: string } => {
    const parts = vocabularyName.split("-");
    if (phase === TestPhase.OriginToTranslation) {
        return { originLang: parts[0] ?? "", targetLang: parts[1] ?? "" };
    } else {
        return { originLang: parts[1] ?? "", targetLang: parts[0] ?? "" };
    }
};
