export interface UpdateWordDto {
    text?: string;
    translation?: string;
    language?: string;
    vocabularyId?: string;
    memoryScore?: number;
    dateForRepetition?: string | null; // ISO string
    learningDate?: string | null; // ISO string
}
