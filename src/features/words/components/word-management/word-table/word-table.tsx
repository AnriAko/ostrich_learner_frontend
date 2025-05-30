import "./word-table.style.css";
import { WordDto } from "../../../dto/word.dto";
import { WordFilterDto } from "../dto/word-filter.dto";
import { useTranslation } from "react-i18next";
import { Theme } from "../../../../user-config/types/theme";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { WordTableHeader } from "./word-table-header";
import { WordTableBody } from "./word-table-body";
import { getWordTableHeaders } from "./word-table-header.config";

interface Props {
    words: WordDto[];
    sortBy?: WordFilterDto["sortBy"];
    sortOrder?: WordFilterDto["sortOrder"];
    onSortChange: (field: WordFilterDto["sortBy"]) => void;
}

export const WordTable = ({
    words,
    sortBy,
    sortOrder,
    onSortChange,
}: Props) => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    const headers = getWordTableHeaders(t);

    const tableClass =
        "text-xs border-collapse whitespace-nowrap " +
        (theme === Theme.dark
            ? "bg-gray-900 text-gray-200 border border-gray-600"
            : "bg-white text-gray-900 border border-gray-300");

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "short",
        };
        if (date.getFullYear() !== now.getFullYear()) options.year = "numeric";
        return date.toLocaleDateString(undefined, options);
    };

    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        if (date.getFullYear() !== now.getFullYear()) options.year = "numeric";
        return date.toLocaleString(undefined, options);
    };

    return (
        <div className="mx-auto overflow-x-auto max-w-full">
            <table className={tableClass}>
                <WordTableHeader
                    headers={headers}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortChange={onSortChange}
                />
                <WordTableBody
                    words={words}
                    headers={headers}
                    formatDate={formatDate}
                    formatDateTime={formatDateTime}
                />
            </table>
        </div>
    );
};
