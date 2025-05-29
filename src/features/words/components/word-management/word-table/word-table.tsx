import "./word-table.style.css";
import { WordDto } from "../../../dto/word.dto";
import { WordFilterDto } from "../dto/word-filter.dto";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";

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

    const headers: { field: WordFilterDto["sortBy"]; label: string }[] = [
        { field: "origin", label: t("table.origin", "Origin") },
        { field: "translation", label: t("table.translation", "Translation") },
        { field: "vocabularyName", label: t("table.vocabulary", "Vocabulary") },
        { field: "memoryScore", label: t("table.memoryScore", "Memory Score") },
        { field: "learningDate", label: t("table.learned", "Learned") },
        { field: "dateForRepetition", label: t("table.repeat", "Repeat") },
        {
            field: "creationDate",
            label: t("table.addedToVocab", "Added to Vocab"),
        },
    ];

    const renderHeader = (field: WordFilterDto["sortBy"], label: string) => {
        const isActive = sortBy === field;
        const arrow = isActive ? (sortOrder === "asc" ? "↑" : "↓") : "";

        const baseClass =
            "w-32 px-0.5 py-0 cursor-pointer select-none text-center h-6 border-b border-x";
        const themeClass =
            theme === Theme.dark
                ? "bg-gray-900 text-gray-200 border-gray-600"
                : "bg-gray-200 text-gray-900 border-gray-300";

        return (
            <th
                key={field}
                className={`${baseClass} ${themeClass}`}
                onClick={() => onSortChange(field)}
                style={{ userSelect: "none" }}
                scope="col"
            >
                {label} {arrow}
            </th>
        );
    };

    const tableClassNames =
        "word-table-scroll table-auto text-xs text-left whitespace-nowrap box-border border-collapse w-auto " +
        (theme === Theme.dark
            ? "bg-gray-900 text-gray-200 border border-gray-600"
            : "bg-white text-gray-900 border border-gray-300");

    const headerClassNames =
        theme === Theme.dark
            ? "bg-gray-900 text-gray-200 border-b border-gray-600 h-6 text-center"
            : "bg-gray-200 text-gray-900 border-b border-gray-300 h-6 text-center";

    const getRowBgClass = (index: number) => {
        if (theme === Theme.dark) {
            return index % 2 === 0 ? "bg-gray-800" : "bg-gray-700";
        }
        return index % 2 === 0 ? "bg-white" : "bg-gray-100";
    };

    const cellBorderClass =
        theme === Theme.dark
            ? "border border-gray-600"
            : "border border-gray-300";

    return (
        <div className="word-table-wrapper mx-auto">
            <div className="word-table-scroll">
                <table className={tableClassNames}>
                    <thead className={headerClassNames}>
                        <tr>
                            {headers.map(({ field, label }) =>
                                renderHeader(field, label)
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {words.map((word, index) => (
                            <tr key={word.id} className={getRowBgClass(index)}>
                                <td className={`p-0.5 ${cellBorderClass}`}>
                                    <div className="w-32 px-0.5 py-0 overflow-x-auto text-xs text-center">
                                        {word.origin}
                                    </div>
                                </td>
                                <td className={`p-0.5 ${cellBorderClass}`}>
                                    <div className="w-32 px-0.5 py-0 overflow-x-auto text-xs text-center">
                                        {word.translation}
                                    </div>
                                </td>
                                <td className={`p-0.5 ${cellBorderClass}`}>
                                    <div className="w-32 px-0.5 py-0 overflow-x-auto text-xs text-center">
                                        {word.vocabularyName ?? "—"}
                                    </div>
                                </td>
                                <td className={`p-0.5 ${cellBorderClass}`}>
                                    <div className="w-32 px-0.5 py-0 overflow-x-auto text-xs text-center">
                                        {word.memoryScore}
                                    </div>
                                </td>
                                <td className={`p-0.5 ${cellBorderClass}`}>
                                    <div className="w-32 px-0.5 py-0 overflow-x-auto text-xs text-center">
                                        {word.learningDate
                                            ? word.learningDate.slice(0, 10)
                                            : "—"}
                                    </div>
                                </td>
                                <td className={`p-0.5 ${cellBorderClass}`}>
                                    <div className="w-32 px-0.5 py-0 overflow-x-auto text-xs text-center">
                                        {word.dateForRepetition
                                            ? word.dateForRepetition.slice(
                                                  0,
                                                  10
                                              )
                                            : "—"}
                                    </div>
                                </td>
                                <td className={`p-0.5 ${cellBorderClass}`}>
                                    <div className="w-32 px-0.5 py-0 overflow-x-auto text-xs text-center">
                                        {word.creationDate
                                            ? new Date(
                                                  word.creationDate
                                              ).toLocaleString(undefined, {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                                  hour12: false,
                                              })
                                            : "—"}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
