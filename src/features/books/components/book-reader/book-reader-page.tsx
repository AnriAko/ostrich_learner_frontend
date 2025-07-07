import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { PaginationControls } from "../../../../shared/components/pagination-control";
import { useGetBookPage } from "../../hooks/use-book";
import { BookPageList } from "./book-page-list";
import { BookSidePanel } from "./book-side-panel";

export const BookReaderPage: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [searchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const initialPageSize = parseInt(searchParams.get("pageSize") || "1", 10);

    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const { data: bookData, isLoading } = useGetBookPage(
        bookId ?? "",
        page,
        pageSize
    );

    const handlePageChange = (newPage: number) => setPage(newPage);
    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setPage(1);
    };

    if (!bookData || isLoading) {
        return <div className="p-4">{t("bookReader.loading")}</div>;
    }

    const borderColorClass = isDark ? "border-gray-700" : "border-gray-300";
    const lineBgClass = isDark ? "bg-gray-700" : "bg-gray-300";
    const badgeBgClass = isDark
        ? "bg-transparent text-gray-300"
        : "bg-transparent text-gray-500";

    return (
        <div className="p-4 w-full flex flex-col gap-4">
            <div className="text-xl font-bold">{bookData.title}</div>

            <PaginationControls
                page={page}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                maxPage={Math.ceil(bookData.totalPages / pageSize)}
                totalItems={bookData.totalPages}
                pageSizeOptions={[1, 2, 3, 4, 5, 10]}
                itemsPerPageLabel={t("pagination.PagesPerPage")}
                totalFoundLabel={(count) =>
                    t("pagination.totalPagesFound", { count })
                }
            />

            <div className="flex w-full">
                <BookPageList
                    pages={bookData.pages}
                    page={page}
                    pageSize={pageSize}
                    isDark={isDark}
                    borderColorClass={borderColorClass}
                    lineBgClass={lineBgClass}
                    badgeBgClass={badgeBgClass}
                />
                <BookSidePanel />
            </div>
        </div>
    );
};
