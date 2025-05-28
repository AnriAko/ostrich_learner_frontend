export interface WordDto {
    id: number;
    origin: string;
    translation: string;
    memoryScore: number;
    learningDate: string | null;
    dateForRepetition: string | null;
    vocabularyId: string;
}
