import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookTranslationService } from "../service/book-translation-service";
import {
    BookAddTranslationDto,
    BookRemoveTranslationDto,
} from "../dto/book-translation.dto";
import { WordDto } from "../../words/dto/word.dto";

export const useAddTranslation = () => {
    const queryClient = useQueryClient();

    return useMutation<
        WordDto,
        Error,
        { bookId: string; dto: BookAddTranslationDto; visiblePages: number[] }
    >({
        mutationFn: ({ bookId, dto }) =>
            BookTranslationService.addTranslation(bookId, dto),

        onSuccess: (_, { bookId, visiblePages }) => {
            visiblePages.forEach((pageIndex) => {
                queryClient.invalidateQueries({
                    queryKey: ["books", "page", "pageSize", bookId, pageIndex],
                });
            });
        },
    });
};

export const useRemoveTranslation = (bookId: string) => {
    const queryClient = useQueryClient();

    return useMutation<
        void,
        Error,
        { visiblePages: number[] } & BookRemoveTranslationDto
    >({
        mutationFn: ({ visiblePages, ...dto }) => {
            return BookTranslationService.removeTranslation(bookId, dto);
        },
        onSuccess: (_, { visiblePages }) => {
            visiblePages.forEach((pageIndex) => {
                queryClient.invalidateQueries({
                    queryKey: ["books", "page", "pageSize", bookId, pageIndex],
                });
            });
        },
        onError: (error, dto) => {
            console.error(
                "[useRemoveTranslation] Error for dto:",
                dto,
                "Error:",
                error
            );
        },
    });
};
