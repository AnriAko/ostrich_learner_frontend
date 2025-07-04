import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookTranslationService } from "../service/book-translation-service";
import {
    BookAddTranslationDto,
    BookRemoveTranslationDto,
} from "../dto/book-translation.dto";
import { WordDto } from "../../words/dto/word.dto";

export const useAddTranslation = (bookId: string, page: number) => {
    const queryClient = useQueryClient();

    return useMutation<WordDto, Error, BookAddTranslationDto, unknown>({
        mutationFn: (dto) => BookTranslationService.addTranslation(bookId, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["books", "page", bookId, page],
            });
        },
    });
};

export const useRemoveTranslation = (bookId: string, page: number) => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, BookRemoveTranslationDto, unknown>({
        mutationFn: (dto) =>
            BookTranslationService.removeTranslation(bookId, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["books", "page", bookId, page],
            });
        },
    });
};
