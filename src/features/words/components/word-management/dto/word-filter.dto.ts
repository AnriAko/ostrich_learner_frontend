export interface WordFilterDto {
    userId: string;
    origin?: string;
    translation?: string;
    vocabularyId?: string;
    vocabularyName?: string;
    sortBy?:
        | "origin"
        | "translation"
        | "memoryScore"
        | "learningDate"
        | "dateForRepetition"
        | "vocabularyId"
        | "vocabularyName"
        | "creationDate";
    sortOrder?: "asc" | "desc";
    page?: number;
    pageSize?: number;
}
