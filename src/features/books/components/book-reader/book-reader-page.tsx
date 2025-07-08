import React, { useRef, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { PaginationControls } from "../../../../shared/components/pagination-control";
import { useGetBookPage } from "../../hooks/use-book";
import { BookPageList } from "./book-page-list";
import { BookSidePanel } from "./book-side-panel/book-side-panel";
import { VerticalResizer } from "./vertical-resizer";

export const BookReaderPage: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [searchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const initialPageSize = parseInt(searchParams.get("pageSize") || "1", 10);

    const containerRef = useRef<HTMLDivElement>(null);

    const storageKey = `bookReader:leftWidth:${bookId}`;
    const getInitialWidth = () => {
        const saved = localStorage.getItem(storageKey);
        return saved ? parseInt(saved, 10) : 600;
    };

    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [leftWidth, setLeftWidth] = useState<number>(getInitialWidth);

    const handleResize = (newLeftWidth: number) => {
        setLeftWidth(newLeftWidth);
        localStorage.setItem(storageKey, newLeftWidth.toString());
    };

    const { data: bookData, isLoading } = useGetBookPage(
        bookId ?? "",
        page,
        pageSize
    );

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

    const borderColorClass = isDark ? "border-gray-700" : "border-gray-300";
    const lineBgClass = isDark ? "bg-gray-700" : "bg-gray-300";
    const badgeBgClass = isDark
        ? "bg-transparent text-gray-300"
        : "bg-transparent text-gray-500";

    const containerBgClass = isDark
        ? "bg-gray-900 text-gray-100"
        : "bg-gray-200 text-gray-900";

    return (
        <div
            className={`flex flex-col gap-4 w-full h-full p-6 ${containerBgClass}`}
        >
            <div className="flex items-center text-xl font-bold gap-3">
                <Link
                    to="/dashboard/books/"
                    className={`cursor-pointer select-none 
                        rounded-md
                        px-3 py-1
                        w-10
                        flex items-center justify-center
                        transition-colors duration-200
                        ${
                            isDark
                                ? "bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/40"
                                : "bg-blue-300/20 text-blue-500 hover:bg-blue-300/40"
                        }
                    `}
                    aria-label="Go back to books dashboard"
                    title="Go back to"
                >
                    ←
                </Link>
                <span>{bookData.title}</span>
            </div>

            <PaginationControls
                page={page}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                }}
                maxPage={Math.ceil(bookData.totalPages / pageSize)}
                totalItems={bookData.totalPages}
                pageSizeOptions={[1, 2, 3, 4, 5, 10, 20]}
                itemsPerPageLabel={t("pagination.PagesPerPage")}
                totalFoundLabel={(count) =>
                    t("pagination.totalPagesFound", { count })
                }
            />

            <div ref={containerRef} className="flex flex-1 overflow-hidden">
                <div style={{ width: leftWidth }} className="overflow-hidden">
                    <BookPageList
                        pages={bookData.pages}
                        page={page}
                        pageSize={pageSize}
                        isDark={isDark}
                        borderColorClass={borderColorClass}
                        lineBgClass={lineBgClass}
                        badgeBgClass={badgeBgClass}
                    />
                </div>

                <VerticalResizer
                    containerRef={containerRef}
                    onResizeTo={handleResize}
                    minWidth={390}
                    sidebarWidth={320}
                />

                <BookSidePanel />
            </div>
        </div>
    );
};
