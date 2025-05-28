// WordFilters.tsx
import React from "react";
import { WordFilterDto } from "../../dto/word-filter.dto";

interface Props {
    filters: WordFilterDto;
    onFilterChange: (field: keyof WordFilterDto, value: any) => void;
}

export const WordFilters: React.FC<Props> = ({ filters, onFilterChange }) => (
    <div className="flex gap-2 mb-4">
        <input
            className="border rounded px-2 py-1"
            type="text"
            placeholder="Origin"
            value={filters.origin || ""}
            onChange={(e) => onFilterChange("origin", e.target.value)}
        />
        <input
            className="border rounded px-2 py-1"
            type="text"
            placeholder="Translation"
            value={filters.translation || ""}
            onChange={(e) => onFilterChange("translation", e.target.value)}
        />
        <input
            className="border rounded px-2 py-1 w-24"
            type="number"
            placeholder="Memory Score"
            value={filters.memoryScore ?? ""}
            onChange={(e) => {
                const val = e.target.value;
                const num = Number(val);
                onFilterChange(
                    "memoryScore",
                    val === "" || isNaN(num) ? undefined : num
                );
            }}
        />
    </div>
);
