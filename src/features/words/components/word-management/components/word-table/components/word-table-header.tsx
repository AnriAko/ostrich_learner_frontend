import { WordFilterDto } from "../../../dto/word-filter.dto";
import { Theme } from "../../../../../../user-config/types/theme";
import { useTheme } from "../../../../../../../shared/context/theme-context/use-theme";

interface HeaderProps {
    headers: {
        field: WordFilterDto["sortBy"];
        label: string;
    }[];
    sortBy?: WordFilterDto["sortBy"];
    sortOrder?: WordFilterDto["sortOrder"];
    onSortChange: (field: WordFilterDto["sortBy"]) => void;
    allSelected: boolean;
    onToggleSelectAll: () => void;
}

export const WordTableHeader = ({
    headers,
    sortBy,
    sortOrder,
    onSortChange,
    allSelected,
    onToggleSelectAll,
}: HeaderProps) => {
    const { theme } = useTheme();

    const headerRowClass =
        theme === Theme.dark
            ? "bg-gray-900 text-gray-200 border-b border-gray-600"
            : "bg-gray-300 text-gray-900 border-b border-gray-300";

    const headerCellClass =
        "w-12 max-w-12 min-w-12 px-0.5 py-0 cursor-pointer select-none text-center h-6 " +
        (theme === Theme.dark
            ? "border-b border-x border-gray-600"
            : "border-t border-x border-gray-400 border-b border-gray-300");

    return (
        <thead className={headerRowClass}>
            <tr>
                <th className={headerCellClass}>
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={onToggleSelectAll}
                        className={`custom-checkbox ${
                            theme === Theme.dark ? "dark" : "light"
                        }`}
                    />
                </th>
                {headers.map(({ field, label }) => {
                    const isActive = sortBy === field;
                    const arrow = isActive
                        ? sortOrder === "asc"
                            ? "↑"
                            : "↓"
                        : "";
                    return (
                        <th
                            key={field}
                            className={headerCellClass}
                            onClick={() => onSortChange(field)}
                            scope="col"
                        >
                            {label} {arrow}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};
