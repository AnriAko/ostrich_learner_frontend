// WordTableBody.tsx
import { WordDto } from "../../../dto/word.dto";
import { WordFilterDto } from "../dto/word-filter.dto";
import { Theme } from "../../../../user-config/types/theme";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";

interface BodyProps {
    words: WordDto[];
    headers: {
        field: WordFilterDto["sortBy"];
        label: string;
        type?: "date" | "datetime";
    }[];
    formatDate: (dateStr: string) => string;
    formatDateTime: (dateStr: string) => string;
    selectedIds: string[];
    onToggleWord: (id: string) => void;
}

export const WordTableBody = ({
    words,
    headers,
    formatDate,
    formatDateTime,
    selectedIds,
    onToggleWord,
}: BodyProps) => {
    const { theme } = useTheme();

    const cellBorderClass =
        theme === Theme.dark
            ? "border border-gray-600"
            : "border border-gray-300";

    const cellContentClass = "w-32 px-0.5 py-0 overflow-x-auto text-center h-7";

    const getRowBgClass = (index: number) =>
        theme === Theme.dark
            ? index % 2 === 0
                ? "bg-gray-800"
                : "bg-gray-700"
            : index % 2 === 0
            ? "bg-white"
            : "bg-gray-100";

    const renderCell = (
        word: WordDto,
        field: keyof WordDto,
        type?: "date" | "datetime"
    ) => {
        const value = word[field];
        let display: string;

        if (value == null) {
            display = "—";
        } else if (type === "date") {
            display = formatDate(String(value));
        } else if (type === "datetime") {
            display = formatDateTime(String(value));
        } else {
            display = String(value);
        }

        return (
            <td key={field} className={`p-0.5 ${cellBorderClass}`}>
                <div className={cellContentClass}>{display}</div>
            </td>
        );
    };

    return (
        <tbody>
            {words.map((word, index) => (
                <tr key={word.id} className={getRowBgClass(index)}>
                    <td
                        className={`w-2 max-w-2 p-0.5 text-center ${cellBorderClass}`}
                    >
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(String(word.id))}
                            onChange={() => onToggleWord(String(word.id))}
                            className={`custom-checkbox ${
                                theme === Theme.dark ? "dark" : "light"
                            }`}
                        />
                    </td>
                    {headers.map(({ field, type }) =>
                        renderCell(word, field as keyof WordDto, type)
                    )}
                </tr>
            ))}
        </tbody>
    );
};
