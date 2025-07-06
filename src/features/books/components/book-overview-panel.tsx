import { useUser } from "../../../shared/context/user-context/use-user";
import { useGetBooksByUser } from "../hooks/use-book";
import { useState } from "react";
import { BookList } from "./book-list/book-list";
import { PaginationControls } from "../../../shared/components/pagination-control";
import { useTheme } from "../../../shared/context/theme-context/use-theme";
import { useTranslation } from "react-i18next";

export const BookOverviewPanel = () => {
    const { user } = useUser();
    const [page, setPage] = useState(1);
    const pageSize = 15;
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

            <PaginationControls
                page={page}
                pageSize={pageSize}
                maxPage={maxPage}
                totalItems={data.total}
                onPageChange={setPage}
                onPageSizeChange={() => {}}
                pageSizeOptions={[1, 2, 3, 4, 5, 10]}
                itemsPerPageLabel={t("pagination.booksPerPage")}
                totalFoundLabel={(count) =>
                    t("pagination.totalBooksFound", { count })
                }
            />

            <div className="flex-1 overflow-y-auto min-h-0 word-table-scroll">
                <BookList books={data.data} />
            </div>
        </div>
    );
};
