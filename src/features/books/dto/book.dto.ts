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
    pos_id: number; // position of the word in the page text
    translation_id: number; // SQL ID of the created translation
    origin: string; // original word
    translation: string; // translated word
}

export interface BookPageRawDto {
    t: string; // full text of the page
    tr: BookTranslationDto[]; // translations for words on this page
}
