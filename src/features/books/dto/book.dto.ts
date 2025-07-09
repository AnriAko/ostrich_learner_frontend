export interface BookDto {
    _id: string;
    b: string; // book name
    p_count: number; // total number of pages
    p: BookPageRawDto[]; // array of page data
}
export interface BookDtoWithoutPages {
    _id: string;
    b: string;
    p_count: number;
    userId: string;
}

export interface BookTranslationDto {
    pos_id: number;
    origin: string;
    translation: string;
    translation_id: number;
    sourceLang: string;
    targetLang: string;
}

export interface BookPageRawDto {
    t: string; // full text of the page
    tr: BookTranslationDto[]; // translations for words on this page
}
