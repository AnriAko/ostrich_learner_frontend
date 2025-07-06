import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryResult,
    UseMutationResult,
} from "@tanstack/react-query";
import { BookService } from "../service/book-service";
import { BookDto, BookPageRawDto } from "../dto/book.dto";
import { BookOverviewDto } from "../dto/book-overview.dto";

export const useGetBooksByUser = (
    userId: string
): UseQueryResult<BookOverviewDto[]> =>
    useQuery({
        queryKey: ["books", "user", userId],
        queryFn: () => BookService.getBooksByUser(userId),
        enabled: Boolean(userId),
    });

export const useGetBookPage = (
    bookId: string,
    page: number
): UseQueryResult<BookPageRawDto> =>
    useQuery({
        queryKey: ["books", "page", bookId, page],
        queryFn: () => BookService.getBookPage(bookId, page),
        enabled: Boolean(bookId && page > 0),
    });

export const useUpdateBook = (): UseMutationResult<
    BookDto,
    Error,
    { id: string; data: Partial<BookDto> }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => BookService.updateBook(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["books", "user"] });
            queryClient.invalidateQueries({ queryKey: ["books", id] });
        },
    });
};

export const useDeleteBook = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: BookService.deleteBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books", "user"] });
        },
    });
};
