export interface VocabularyDto {
    id: string;
    name: string;
}

export interface WordDto {
    id: number;
    origin: string;
    translation: string;
    vocabulary: VocabularyDto;
    dateForRepetition: string | null;
    memoryScore: number;
    learningDate: string | null;
    creationDate: string;
}

export type LearnedWordsByDate = Record<string, WordDto[]>;

export interface LearningStatByDay {
    date: string;
    count: number;
}
