export interface CreateWordDto {
    userId: number;
    word: string;
    translate: string;
    sourceLang: string;
    targetLang: string;
}
