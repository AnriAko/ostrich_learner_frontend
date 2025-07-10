import api from "../../../shared/api/axios-instance";
import {
    BookAddTranslationDto,
    BookRemoveTranslationDto,
} from "../dto/book-translation.dto";
import { WordDto } from "../../words/dto/word.dto";

export const BookTranslationService = {
    async addTranslation(
        bookId: string,
        dto: BookAddTranslationDto
    ): Promise<WordDto> {
        const adjustedDto: BookAddTranslationDto = {
            ...dto,
            pageIndex: dto.pageIndex - 1,
        };

        const response = await api.post<WordDto>(
            `/book-translation/${bookId}/word`,
            adjustedDto
        );
        return response.data;
    },

    async removeTranslation(
        bookId: string,
        dto: BookRemoveTranslationDto
    ): Promise<void> {
        const adjustedDto: BookRemoveTranslationDto = {
            ...dto,
            pageIndex: dto.pageIndex - 1,
        };

        await api.delete(`/book-translation/${bookId}/word`, {
            data: adjustedDto,
        });
    },
};
