import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryResult,
    UseMutationResult,
} from "@tanstack/react-query";
import { BookService } from "../service/book-service";
import { BookDto } from "../dto/book.dto";
import { PaginatedBooksDto } from "../dto/paginated-books.dto";
import { BookPageResponseDto } from "../dto/book-page-response.dto";

export const useGetBooksByUser = (
    userId: string,
    page: number,
    pageSize: number
): UseQueryResult<PaginatedBooksDto> =>
    useQuery({
        queryKey: ["books", "user", userId, page, pageSize],
        queryFn: () => BookService.getBooksByUser(userId, page, pageSize),
        enabled: Boolean(userId),
    });

export const useGetBookPage = (
    bookId: string,
    page: number,
    pageSize: number
): UseQueryResult<BookPageResponseDto> =>
    useQuery({
        queryKey: ["books", "page", "pageSize", bookId, page, pageSize],
        queryFn: () => BookService.getBookPage(bookId, page, pageSize),
        enabled: Boolean(bookId && page > 0),
    });

export const useUpdateBookTitle = (): UseMutationResult<
    BookDto,
    Error,
    { id: string; userId: string; title: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, userId, title }) =>
            BookService.updateBookTitle(id, { userId, title }),
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
