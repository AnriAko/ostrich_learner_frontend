// use-book-translation.ts
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
                queryKey: ["books", "page", "pageSize", bookId, dto.pageIndex],
            });
        },
    });
};

export const useRemoveTranslation = (bookId: string) => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, BookRemoveTranslationDto>({
        mutationFn: (dto) => {
            console.log(
                "[useRemoveTranslation] Mutation called with dto:",
                dto
            );
            return BookTranslationService.removeTranslation(bookId, dto);
        },
        onSuccess: (_, dto) => {
            console.log("[useRemoveTranslation] Success for dto:", dto);
            queryClient.invalidateQueries({
                queryKey: ["books", "page", "pageSize", bookId, dto.pageIndex],
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
