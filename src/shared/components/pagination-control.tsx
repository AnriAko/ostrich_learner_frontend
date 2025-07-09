import { useTranslation } from "react-i18next";
import { useTheme } from "../context/theme-context/use-theme";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    maxPage?: number;
    totalItems?: number;
    pageSizeOptions?: number[];
    itemsPerPageLabel?: string;
    totalFoundLabel?: string | ((count: number) => string);
}

export function PaginationControls({
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    maxPage,
    totalItems,
    pageSizeOptions = [10, 20, 30, 40, 50],
    itemsPerPageLabel,
    totalFoundLabel,
}: Props) {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const maxPageSafe = maxPage && maxPage > 0 ? maxPage : 1;
    const [inputPage, setInputPage] = useState(page);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setInputPage(page);
    }, [page]);

    const updateParams = (newPage: number, newPageSize = pageSize) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage.toString());
        newParams.set("pageSize", newPageSize.toString());
        setSearchParams(newParams);
    };

    const handlePrev = () => {
        if (page > 1) {
            onPageChange(page - 1);
            updateParams(page - 1);
        }
    };

    const handleNext = () => {
        if (page < maxPageSafe) {
            onPageChange(page + 1);
            updateParams(page + 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setInputPage(Number(value));
        }
    };

    const handleInputBlur = () => {
        let newPage = inputPage;
        if (newPage < 1) newPage = 1;
        if (newPage > maxPageSafe) newPage = maxPageSafe;
        onPageChange(newPage);
        updateParams(newPage);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
        }
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = Number(e.target.value);
        onPageSizeChange(newSize);
        updateParams(1, newSize);
    };

    const themeClasses = isDark
        ? {
              container: "border-gray-700 text-gray-300",
              button: "bg-yellow-300 text-gray-800 hover:bg-yellow-200",
              select: "bg-gray-800 border-gray-700 text-gray-300",
              input: "bg-gray-800 border-gray-700 text-gray-300",
              divider: "border-gray-700",
          }
        : {
              container: "border-gray-300 text-gray-800",
              button: "bg-blue-500 text-white hover:bg-blue-600",
              select: "bg-white border-gray-300 text-gray-800",
              input: "bg-white border-gray-300 text-gray-800",
              divider: "border-gray-300",
          };

    const getButtonClass = (disabled: boolean) => {
        const base = `${themeClasses.button} h-5 px-2 text-xs rounded font-medium leading-none`;
        const cursorClass = disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer";
        return `${base} ${cursorClass}`;
    };

    return (
        <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs ${themeClasses.container} rounded-sm w-max max-w-full mb-2`}
        >
            <div className="flex items-center gap-1 flex-wrap">
                <button
                    onClick={handlePrev}
                    disabled={page <= 1}
                    className={getButtonClass(page <= 1)}
                >
                    {t("pagination.prev")}
                </button>

                <div className="flex items-center gap-1">
                    <span>{t("pagination.page")}</span>
                    <input
                        id="page-input"
                        type="text"
                        value={inputPage}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleInputKeyDown}
                        className={`w-10 h-5 text-center px-1 text-xs rounded border shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 ${themeClasses.input}`}
                    />
                    <span>/ {maxPageSafe}</span>
                </div>

                <button
                    onClick={handleNext}
                    disabled={page >= maxPageSafe}
                    className={getButtonClass(page >= maxPageSafe)}
                >
                    {t("pagination.next")}
                </button>

                <div className={`h-5 border-l mx-2 ${themeClasses.divider}`} />

                <div className="flex items-center gap-1">
                    <label htmlFor="pageSizeSelect" className="text-xs">
                        {itemsPerPageLabel ?? t("pagination.itemsPerPage")}:
                    </label>
                    <select
                        id="pageSizeSelect"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        className={`h-5 px-2 text-xs rounded border shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 ${themeClasses.select}`}
                    >
                        {pageSizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {typeof totalItems === "number" && (
                <div className="text-xs text-gray-500">
                    {typeof totalFoundLabel === "function"
                        ? totalFoundLabel(totalItems)
                        : totalFoundLabel ??
                          t("pagination.totalFound", { count: totalItems })}
                </div>
            )}
        </div>
    );
}
