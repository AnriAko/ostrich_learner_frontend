import React from "react";
import { BookOverviewDto } from "../dto/book-overview.dto";
import { useTheme } from "../../../shared/context/theme-context/use-theme";

interface BookListProps {
    books: BookOverviewDto[];
}

export const BookList: React.FC<BookListProps> = ({ books }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const calcProgress = (book: BookOverviewDto) => {
        const { lastViewedPage, lastViewedPageSize, p_count } = book;
        if (
            typeof lastViewedPage === "number" &&
            typeof lastViewedPageSize === "number" &&
            typeof p_count === "number" &&
            p_count > 0 &&
            lastViewedPage > 0
        ) {
            const completed = (lastViewedPage - 1) * lastViewedPageSize;
            return Math.min((completed / p_count) * 100, 100);
        }
        return 0;
    };

    const baseClass = isDark
        ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-900"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";
    const progressBarColor = isDark ? "bg-yellow-300" : "bg-blue-500";
    const progressBarBackground = isDark ? "bg-gray-700" : "bg-gray-400";

    return (
        <div className="w-full h-[70vh] overflow-y-auto pr-1">
            <div className="flex flex-wrap gap-[2%]">
                {books.map((book) => {
                    const progressPercent = calcProgress(book);
                    return (
                        <div
                            key={book._id}
                            className={`border rounded-lg p-4
                                flex flex-col justify-start cursor-pointer
                                ${baseClass}
                                min-w-[150px] min-h-[120px] 
                                h-[25vh] 
                                basis-[18%]
                            `}
                            title={book.b}
                            style={{ marginBottom: "2%" }}
                        >
                            <div className="font-semibold w-full mb-2 whitespace-normal break-words">
                                {book.b}
                            </div>
                            <div
                                className={`w-full ${progressBarBackground} rounded-full h-3 overflow-hidden mt-auto`}
                            >
                                <div
                                    className={`h-3 rounded-full ${progressBarColor}`}
                                    style={{
                                        width: `${progressPercent.toFixed(0)}%`,
                                    }}
                                />
                            </div>
                            <div className="text-xs mt-1">
                                {progressPercent.toFixed(0)}%
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
