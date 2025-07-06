import api from "../../../shared/api/axios-instance";
import { BookDto, BookPageRawDto } from "../dto/book.dto";
import { PaginatedBooksDto } from "../dto/paginated-books.dto";

const ROUTE_URL = "book";

export class BookService {
    static async getBooksByUser(
        userId: string,
        page = 1,
        pageSize = 15
    ): Promise<PaginatedBooksDto> {
        console.log(userId, page, pageSize);
        const res = await fetch(
            `/api/book/user/${userId}?page=${page}&pageSize=${pageSize}`
        );
        console.log(res);
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
    }

    static async getBookPage(
        bookId: string,
        page: number
    ): Promise<BookPageRawDto> {
        const { data } = await api.get(`${ROUTE_URL}/${bookId}/page`, {
            params: { page },
        });
        return data;
    }

    static async updateBookTitle(
        bookId: string,
        updateDto: { userId: string; title: string }
    ): Promise<BookDto> {
        const { data } = await api.patch(
            `${ROUTE_URL}/${bookId}/title`,
            updateDto
        );
        return data;
    }

    static async deleteBook(bookId: string): Promise<void> {
        await api.delete(`${ROUTE_URL}/${bookId}`);
    }
}
