export interface WordDto {
    id: number;
    word: string;
    translate: string;
    memoryScore: number;
    learningDate: string | null;
    dateForRepetition: string | null;
    vocabularyId: string;
}
