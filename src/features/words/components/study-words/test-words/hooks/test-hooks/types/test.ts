export type IsCorrectType =
    | "directMatch"
    | "userHasThisTranslation"
    | "noMatch";

export interface TestCard {
    id: number;
    origin: string;
    translation: string;
    vocabularyName: string;
    userAnswer?: string;
    isCorrect?: IsCorrectType;
}

export enum TestPhase {
    OriginToTranslation = "OriginToTranslation",
    TranslationToOrigin = "TranslationToOrigin",
    Completed = "Completed",
}

export type TestResult = {
    id: number;
    isMistaken: boolean;
};