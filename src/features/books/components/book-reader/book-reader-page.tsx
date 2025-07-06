import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PaginationControls } from "../../../../shared/components/pagination-control";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { useTranslation } from "react-i18next";
import { useGetBookPage } from "../../hooks/use-book";

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

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

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

            <div className="flex-1 overflow-y-auto max-h-[70vh] pr-1 flex flex-col items-start gap-0 word-table-scroll">
                <div className={`w-full max-w-[70%] relative mb-6`}>
                    <div
                        className={`flex items-center w-full absolute left-0 -top-3 z-10`}
                        style={{ pointerEvents: "none" }}
                    >
                        <div className={`flex-1 h-0.5 ${lineBgClass}`} />
                        <span
                            className={`mx-2 text-xs font-mono px-1 ${badgeBgClass}`}
                            style={{ userSelect: "none" }}
                        >
                            {(page - 1) * pageSize + 1}
                        </span>
                        <div className={`flex-1 h-0.5 ${lineBgClass}`} />
                    </div>
                </div>

                {bookData.pages.map((pageData, index) => {
                    const globalPageNumber = (page - 1) * pageSize + index + 1;
                    const isLast = index === bookData.pages.length - 1;

                    return (
                        <div
                            key={index}
                            className="w-full max-w-[70%] flex flex-col items-start relative mb-8"
                        >
                            <div
                                className={`flex items-center w-full absolute left-0 -top-3 z-10`}
                                style={{ pointerEvents: "none" }}
                            >
                                <div
                                    className={`flex-1 h-0.5 ${lineBgClass} mr-[-10px]`}
                                />
                                <span
                                    className={`mx-2 text-xs font-mono px-1 ${badgeBgClass}`}
                                    style={{ userSelect: "none" }}
                                >
                                    {globalPageNumber}
                                </span>
                                <div
                                    className={`flex-1 h-0.5 ${lineBgClass} ml-[-10px]`}
                                />
                            </div>

                            <div
                                className={`relative w-full border-l-2 border-r-2 ${
                                    isLast ? "border-b-2" : ""
                                } ${borderColorClass} ${
                                    isDark
                                        ? "bg-gray-800 text-gray-100"
                                        : "bg-white text-gray-800"
                                }`}
                                style={{ marginTop: -3, marginBottom: -28 }}
                            >
                                <div className="px-6 py-4 whitespace-pre-wrap pt-5 pd-5">
                                    {pageData.t}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
