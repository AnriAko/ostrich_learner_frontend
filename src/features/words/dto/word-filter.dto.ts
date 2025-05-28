export interface WordFilterDto {
    userId: string;
    origin?: string;
    translation?: string;
    memoryScore?: number;
    learningDateFrom?: string;
    learningDateTo?: string;
    dateForRepetitionFrom?: string;
    dateForRepetitionTo?: string;
    vocabularyId?: string;
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?:
        | "id"
        | "origin"
        | "translation"
        | "memoryScore"
        | "learningDate"
        | "dateForRepetition"
        | "vocabularyId";
    sortOrder?: "ASC" | "DESC";
}
