import React from "react";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";

interface Props {
    percent: number;
}

export const BookProgressBar: React.FC<Props> = ({ percent }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const trackClass = isDark
        ? "bg-gray-700 group-hover:bg-gray-800"
        : "bg-gray-400 group-hover:bg-gray-500";

    const fillClass = isDark
        ? "bg-yellow-300 group-hover:bg-yellow-400"
        : "bg-blue-500 group-hover:bg-blue-600";

    const textClass = isDark ? "text-gray-300" : "text-gray-700";

    return (
        <>
            <div
                className={`w-full ${trackClass} rounded-full h-3 overflow-hidden mt-auto `}
            >
                <div
                    className={`h-3 rounded-full ${fillClass}`}
                    style={{ width: `${percent.toFixed(0)}%` }}
                />
            </div>
            <div className={`text-xs mt-1 ${textClass}`}>
                {percent.toFixed(0)}%
            </div>
        </>
    );
};
