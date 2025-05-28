// Pagination.tsx
import React from "react";

interface Props {
    currentPage: number;
    total: number;
    pageSize: number;
    onPrev: () => void;
    onNext: () => void;
}

export const Pagination: React.FC<Props> = ({
    currentPage,
    total,
    pageSize,
    onPrev,
    onNext,
}) => (
    <div className="flex items-center gap-4 mt-4">
        <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={onPrev}
            disabled={currentPage <= 1}
        >
            Prev
        </button>
        <span>Page {currentPage}</span>
        <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={onNext}
            disabled={total <= currentPage * pageSize}
        >
            Next
        </button>
    </div>
);
