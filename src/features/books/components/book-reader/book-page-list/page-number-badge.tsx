import React from "react";

interface PageNumberLineProps {
    number: number;
    lineBgClass: string;
    badgeBgClass: string;
}

export const PageNumberLine: React.FC<PageNumberLineProps> = ({
    number,
    lineBgClass,
    badgeBgClass,
}) => (
    <div className="relative mb-6 min-w-[370px]">
        <div
            className="flex items-center absolute left-0 -top-3 z-10 w-full min-w-[370px]"
            style={{ pointerEvents: "none" }}
        >
            <div className={`flex-1 h-0.5 ${lineBgClass}`} />
            <span
                className={`mx-2 text-xs font-mono px-1 ${badgeBgClass}`}
                style={{ userSelect: "none" }}
            >
                {number}
            </span>
            <div className={`flex-1 h-0.5 ${lineBgClass}`} />
        </div>
    </div>
);
