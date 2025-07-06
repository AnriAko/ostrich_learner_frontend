import { BookOverviewDto } from "./book-overview.dto";

export interface PaginatedBooksDto {
    data: BookOverviewDto[];
    total: number;
}
