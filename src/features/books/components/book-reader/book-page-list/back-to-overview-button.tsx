import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";

export const BackToOverviewButton: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const buttonClass = `
        cursor-pointer select-none 
        rounded-md px-3 py-1 w-10
        flex items-center justify-center
        transition-colors duration-200
        ${
            isDark
                ? "bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/40"
                : "bg-blue-300/20 text-blue-500 hover:bg-blue-300/40"
        }
    `;

    return (
        <Link
            to="/dashboard/books/"
            className={buttonClass}
            aria-label="Go back to books dashboard"
            title="Go back to books"
        >
            ←
        </Link>
    );
};
