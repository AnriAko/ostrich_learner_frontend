export interface CreateWordDto {
    origin: string;
    translation: string;
    sourceLang: string;
    targetLang: string;
    userId: string;
}

export interface BookAddTranslationDto {
    pageIndex: number;
    posId: number;
    createWordDto: CreateWordDto;
}

export interface BookRemoveTranslationDto {
    pageIndex: number;
    posId: number;
    translationId: number;
}
