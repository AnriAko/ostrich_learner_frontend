import React from "react";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { useTranslation } from "react-i18next";

interface BookMenuProps {
    bookId: string;
    onEditStart: () => void;
    onDelete: () => void;
    onClose: () => void;
}

export const BookMenu: React.FC<BookMenuProps> = ({
    onEditStart,
    onDelete,
    onClose,
}) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { t } = useTranslation();

    return (
        <div
            className={`absolute z-50 w-40 rounded border shadow-md
        ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className={`block w-full text-left px-4 py-2
        ${
            isDark
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 text-gray-800 hover:bg-gray-300"
        }`}
                onClick={() => {
                    onEditStart();
                    onClose();
                }}
            >
                {t("bookOverview.updateTitle")}
            </button>

            <button
                className={`block w-full text-left px-4 py-2
        ${
            isDark
                ? "bg-gray-800 text-gray-300 hover:bg-red-900"
                : "bg-gray-100 text-gray-800 hover:bg-red-500"
        }`}
                onClick={() => {
                    onDelete();
                    onClose();
                }}
            >
                {t("bookOverview.deleteBook")}
            </button>
        </div>
    );
};
