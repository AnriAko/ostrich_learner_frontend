import { useUser } from "../../../shared/context/user-context/use-user";
import { useGetBooksByUser } from "../hooks/use-book";
import { useState } from "react";
import { BookList } from "./book-list/book-list";
import { PaginationControls } from "../../../shared/components/pagination-control";
import { useTheme } from "../../../shared/context/theme-context/use-theme";
import { useTranslation } from "react-i18next";
import { UploadBookButton } from "./book-reader/upload-book-button";

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

    if (isLoading) return <p>Loading books...</p>;
    if (!data?.data.length) return <p>No books found.</p>;

    const maxPage = Math.ceil(data.total / pageSize);

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
                        totalItems={data.total}
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
                <BookList books={data.data} />
            </div>
        </div>
    );
};
