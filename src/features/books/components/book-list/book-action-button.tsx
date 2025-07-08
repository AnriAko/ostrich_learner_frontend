import React from "react";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";

interface Props {
    label: string;
}

export const BookActionButton: React.FC<Props> = ({ label }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const baseClass =
        "mt-2 text-xs py-1 px-2 rounded font-semibold cursor-pointer";

    const lightClass = "bg-blue-500 text-white group-hover:bg-blue-700";
    const darkClass = "bg-yellow-300 text-gray-900 group-hover:bg-yellow-500";

    return (
        <button className={`${baseClass} ${isDark ? darkClass : lightClass}`}>
            {label}
        </button>
    );
};
