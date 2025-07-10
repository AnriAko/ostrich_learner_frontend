import { useUser } from "../../../../../shared/context/user-context/use-user";
import { useGetBooksByUser } from "../../../hooks/use-book";
import { useState } from "react";
import { BookList } from "../../book-list/book-list";
import { PaginationControls } from "../../../../../shared/components/pagination-control";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { useTranslation } from "react-i18next";
import { UploadBookButton } from "./upload-book-button";

export const BookOverviewPanel = () => {
    const { user } = useUser();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { t } = useTranslation();

    const { data, isLoading } = useGetBooksByUser(
        user?.userId || "",
        page,
        pageSize
    );

    const books = data?.data ?? [];
    const total = data?.total ?? 0;
    const maxPage = Math.max(1, Math.ceil(total / pageSize));

    const bgClass = isDark
        ? "bg-gray-900 text-gray-300"
        : "bg-gray-200 text-gray-900";

    return (
        <div
            className={`p-6 w-full flex flex-col ${bgClass}`}
            style={{ height: "80.5vh" }}
        >
            <h1
                className={`text-xl font-bold mb-4 ${
                    isDark ? "text-yellow-300" : "text-blue-600"
                }`}
            >
                {t("bookOverview.viewBooks")}
            </h1>

            <div className="flex items-center gap-3 mb-2 flex-nowrap">
                <div className="max-w-full flex-shrink">
                    <PaginationControls
                        page={page}
                        pageSize={pageSize}
                        maxPage={maxPage}
                        totalItems={total}
                        onPageChange={setPage}
                        onPageSizeChange={(newSize) => {
                            setPageSize(newSize);
                            setPage(1);
                        }}
                        pageSizeOptions={[5, 10, 15, 20, 30, 50]}
                        itemsPerPageLabel={t("pagination.booksPerPage")}
                        totalFoundLabel={(count) =>
                            t("pagination.totalBooksFound", { count })
                        }
                    />
                </div>

                <div className="flex-shrink-0 flex items-center">
                    <UploadBookButton />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 word-table-scroll">
                {isLoading ? (
                    <p className="text-sm text-gray-500 px-2">
                        {t("bookOverview.loading", "Loading books...")}
                    </p>
                ) : books.length === 0 ? (
                    <p className="text-sm text-gray-500 px-2 mt-8">
                        {t("bookOverview.noBooks")}
                    </p>
                ) : (
                    <BookList books={books} />
                )}
            </div>
        </div>
    );
};
