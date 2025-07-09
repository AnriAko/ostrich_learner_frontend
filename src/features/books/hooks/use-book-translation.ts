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
        { bookId: string; dto: BookAddTranslationDto },
        unknown
    >({
        mutationFn: ({ bookId, dto }) =>
            BookTranslationService.addTranslation(bookId, dto),

        onSuccess: (_, { bookId, dto }) => {
            queryClient.invalidateQueries({
                queryKey: ["books", "page", bookId, dto.pageIndex],
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
