import "./components/word-table.style.css";
import { WordDto } from "../../../../dto/word.dto";
import { WordFilterDto } from "../../dto/word-filter.dto";
import { useTranslation } from "react-i18next";
import { Theme } from "../../../../../user-config/types/theme";
import { useTheme } from "../../../../../../shared/context/theme-context/use-theme";
import { WordTableHeader } from "./components/word-table-header";
import { WordTableBody } from "./components/word-table-body";
import { getWordTableHeaders } from "./components/word-table-header.config";
import { useEffect } from "react";

import { format } from "date-fns";
import { enUS, ru, ka } from "date-fns/locale";

interface Props {
    words: WordDto[];
    sortBy?: WordFilterDto["sortBy"];
    sortOrder?: WordFilterDto["sortOrder"];
    onSortChange: (field: WordFilterDto["sortBy"]) => void;
    selectedIds: string[];
    onSelectionChange: (ids: string[]) => void;
}

export const WordTable = ({
    words,
    sortBy,
    sortOrder,
    onSortChange,
    selectedIds,
    onSelectionChange,
}: Props) => {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const headers = getWordTableHeaders(t);

    useEffect(() => {
        onSelectionChange([]);
    }, [words, onSelectionChange]);

    const allSelected =
        words.length > 0 &&
        words.every((w) => selectedIds.includes(String(w.id)));

    const toggleSelectAll = () => {
        if (allSelected) onSelectionChange([]);
        else onSelectionChange(words.map((w) => String(w.id)));
    };

    const toggleWordSelection = (id: string) => {
        if (selectedIds.includes(id)) {
            onSelectionChange(selectedIds.filter((i) => i !== id));
        } else {
            onSelectionChange([...selectedIds, id]);
        }
    };

    const tableClass =
        "text-xs border-collapse whitespace-nowrap " +
        (theme === Theme.dark
            ? "bg-gray-900 text-gray-200 border border-gray-600"
            : "bg-white text-gray-900 border border-gray-300");

    // Выбор локали для date-fns
    const getLocale = () => {
        switch (i18n.language) {
            case "ru":
                return ru;
            case "ka":
                return ka;
            case "en":
            default:
                return enUS;
        }
    };

    const locale = getLocale();
    const capitalizeMonthName = (str: string): string => {
        const parts = str.split(" ");
        if (parts.length >= 2) {
            parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
        }
        return parts.join(" ");
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const formatStr =
            date.getFullYear() === now.getFullYear() ? "dd MMM" : "dd MMM yyyy";
        const result = format(date, formatStr, { locale });
        return capitalizeMonthName(result);
    };

    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const formatStr =
            date.getFullYear() === now.getFullYear()
                ? "dd MMM HH:mm"
                : "dd MMM yyyy HH:mm";
        const result = format(date, formatStr, { locale });
        return capitalizeMonthName(result);
    };

    return (
        <div className="mx-auto overflow-x-auto max-w-full">
            <table className={tableClass}>
                <WordTableHeader
                    headers={headers}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortChange={onSortChange}
                    allSelected={allSelected}
                    onToggleSelectAll={toggleSelectAll}
                />
                <WordTableBody
                    words={words}
                    headers={headers}
                    formatDate={formatDate}
                    formatDateTime={formatDateTime}
                    selectedIds={selectedIds}
                    onToggleWord={toggleWordSelection}
                />
            </table>
        </div>
    );
};
