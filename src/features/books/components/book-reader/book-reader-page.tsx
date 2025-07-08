import React, { useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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

    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [leftWidth, setLeftWidth] = useState<number>(600);

    const containerRef = useRef<HTMLDivElement>(null);

    const { data: bookData, isLoading } = useGetBookPage(
        bookId ?? "",
        page,
        pageSize
    );

    if (!bookData || isLoading) {
        return <div className="p-4">{t("bookReader.loading")}</div>;
    }

    const borderColorClass = isDark ? "border-gray-700" : "border-gray-300";
    const lineBgClass = isDark ? "bg-gray-700" : "bg-gray-300";
    const badgeBgClass = isDark
        ? "bg-transparent text-gray-300"
        : "bg-transparent text-gray-500";

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <div className="text-xl font-bold px-4">{bookData.title}</div>

            <div className="px-4">
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
                    pageSizeOptions={[1, 2, 3, 4, 5, 10]}
                    itemsPerPageLabel={t("pagination.PagesPerPage")}
                    totalFoundLabel={(count) =>
                        t("pagination.totalPagesFound", { count })
                    }
                />
            </div>

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
                    onResizeTo={(newLeftWidth) => {
                        setLeftWidth(newLeftWidth);
                    }}
                />

                <BookSidePanel />
            </div>
        </div>
    );
};
