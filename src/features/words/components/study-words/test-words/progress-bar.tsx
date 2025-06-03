import { useEffect, useState } from "react";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";
import { useTranslation } from "react-i18next";

export type CellStatus = 0 | 1 | 2;

interface ProgressBarProps {
    correct: number;
    errors: number;
    total: number;
}

export default function ProgressBar({
    correct,
    errors,
    total,
}: ProgressBarProps) {
    const [cellsStatus, setCellsStatus] = useState<CellStatus[]>(
        new Array(total).fill(0)
    );
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;
    const { t } = useTranslation();

    useEffect(() => {
        const result: CellStatus[] = new Array(total).fill(0);
        let correctLeft = correct;
        let errorsLeft = errors;
        for (let i = 0; i < total; i++) {
            if (correctLeft > 0) {
                result[i] = 2;
                correctLeft--;
            } else if (errorsLeft > 0) {
                result[i] = 1;
                errorsLeft--;
            } else {
                break;
            }
        }
        setCellsStatus(result);
    }, [correct, errors, total]);

    return (
        <div className="mb-4 select-none">
            <div
                className={`flex justify-between text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-800"
                }`}
            >
                <span>{t("tests.Progress")}</span>
                <span>
                    {correct}/{total}
                </span>
            </div>
            <div
                className={`flex w-full rounded h-3 overflow-hidden ${
                    isDark ? "bg-gray-700" : "bg-gray-300"
                }`}
            >
                {cellsStatus.map((status, idx) => {
                    let bgColor = isDark ? "bg-gray-700" : "bg-gray-300";
                    if (status === 2) bgColor = "bg-green-500";
                    else if (status === 1) bgColor = "bg-red-500";
                    return (
                        <div
                            key={idx}
                            className={`${bgColor} h-full transition-colors duration-300`}
                            style={{ flex: "1 1 0%" }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
