import { BookPageRawDto } from "./book.dto";

export interface BookPageResponseDto {
    title: string;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    pages: BookPageRawDto[];
}
