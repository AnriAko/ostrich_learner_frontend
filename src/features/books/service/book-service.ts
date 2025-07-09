import api from "../../../shared/api/axios-instance";
import { BookPageResponseDto } from "../dto/book-page-response.dto";
import { BookDto, BookDtoWithoutPages } from "../dto/book.dto";
import { PaginatedBooksDto } from "../dto/paginated-books.dto";

const ROUTE_URL = "book";

export class BookService {
    static async createBookWithPdf(
        pdfFile: File,
        userId: string,
        fileName?: string
    ): Promise<BookDtoWithoutPages> {
        const formData = new FormData();
        formData.append("file", pdfFile);
        formData.append("userId", userId);

        if (fileName) {
            formData.append("fileName", fileName);
        }

        const { data } = await api.post("book", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    }

    static async getBooksByUser(
        userId: string,
        page = 1,
        pageSize = 15
    ): Promise<PaginatedBooksDto> {
        const res = await fetch(
            `/api/book/user/${userId}?page=${page}&pageSize=${pageSize}`
        );
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
    }

    static async getBookPage(
        bookId: string,
        page: number,
        pageSize: number
    ): Promise<BookPageResponseDto> {
        const { data } = await api.get(`${ROUTE_URL}/${bookId}`, {
            params: { page, pageSize },
        });
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data);
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
