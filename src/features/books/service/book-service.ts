import api from "../../../shared/api/axios-instance";
import { BookDto, BookPageRawDto } from "../dto/book.dto";

const ROUTE_URL = "book";

export class BookService {
    static async getBooksByUser(userId: string): Promise<BookDto[]> {
        const { data } = await api.get(`${ROUTE_URL}/user/${userId}`);
        return data;
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

    static async updateBook(
        bookId: string,
        updateDto: Partial<BookDto>
    ): Promise<BookDto> {
        const { data } = await api.patch(`${ROUTE_URL}/${bookId}`, updateDto);
        return data;
    }

    static async deleteBook(bookId: string): Promise<void> {
        await api.delete(`${ROUTE_URL}/${bookId}`);
    }
}
