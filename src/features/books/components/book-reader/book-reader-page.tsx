import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { useGetBookPage } from "../../hooks/use-book";
import { BackToOverviewButton } from "./book-page-list/back-to-overview-button";
import { BookReaderContent } from "./book-reader-content";
import { PaginationControls } from "../../../../shared/components/pagination-control";

export const BookReaderPage: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [selectedWord, setSelectedWord] = useState<{
        origin: string;
        posId: number;
        pageIndex: number;
    } | null>(null);

    useEffect(() => {
        const newPage = parseInt(searchParams.get("page") || "1", 10);
        const newSize = parseInt(searchParams.get("pageSize") || "1", 10);
        if (!isNaN(newPage) && newPage !== page) setPage(newPage);
        if (!isNaN(newSize) && newSize !== pageSize) setPageSize(newSize);
    }, [searchParams, page, pageSize]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        params.set("pageSize", pageSize.toString());
        setSearchParams(params);
    };

    const handlePageSizeChange = (newSize: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        params.set("pageSize", newSize.toString());
        setSearchParams(params);
    };

    const { data: bookData, isLoading } = useGetBookPage(
        bookId ?? "",
        page,
        pageSize
    );

    if (!bookId) {
        return (
            <div
                className={`p-4 ${
                    isDark
                        ? "bg-gray-900 text-gray-100"
                        : "bg-gray-100 text-gray-900"
                }`}
            >
                {t("bookReader.noBookSelected")}
            </div>
        );
    }

    if (!bookData || isLoading) {
        return (
            <div
                className={`p-4 ${
                    isDark
                        ? "bg-gray-900 text-gray-100"
                        : "bg-gray-100 text-gray-900"
                }`}
            >
                {t("bookReader.loading")}
            </div>
        );
    }

    const containerBgClass = isDark
        ? "bg-gray-900 text-gray-100"
        : "bg-gray-200 text-gray-900";

    return (
        <div
            className={`flex flex-col gap-4 w-full h-full p-6 ${containerBgClass}`}
        >
            <div className="flex items-center text-xl font-bold gap-3">
                <BackToOverviewButton />
                <span>{bookData.title}</span>
            </div>

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

            <BookReaderContent
                bookId={bookId}
                pages={bookData.pages}
                page={page}
                pageSize={pageSize}
                selectedWord={selectedWord}
                onWordClick={(info) => setSelectedWord(info)}
            />
        </div>
    );
};
