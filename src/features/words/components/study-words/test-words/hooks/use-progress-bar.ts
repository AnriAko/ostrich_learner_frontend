import { useState, useCallback } from "react";

export type CellStatus = 0 | 1 | 2;

export function useProgressBar(total: number) {
    const [cellsStatus, setCellsStatus] = useState<CellStatus[]>(
        new Array(total).fill(0)
    );

    const addAnswer = useCallback(
        (status: CellStatus) => {
            if (status !== 1 && status !== 2) {
                console.warn(
                    "useProgressBar: addAnswer status have to be 1 or 2"
                );
                return;
            }
            setCellsStatus((prev) => {
                return [status, ...prev.slice(0, total - 1)];
            });
        },
        [total]
    );

    const reset = useCallback(() => {
        setCellsStatus(new Array(total).fill(0));
    }, [total]);

    return {
        cellsStatus,
        addAnswer,
        reset,
    };
}
