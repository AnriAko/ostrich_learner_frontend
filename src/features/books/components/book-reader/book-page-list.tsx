import React from "react";

interface BookPageListProps {
    pages: { t: string }[];
    page: number;
    pageSize: number;
    isDark: boolean;
    borderColorClass: string;
    lineBgClass: string;
    badgeBgClass: string;
}

export const BookPageList: React.FC<BookPageListProps> = ({
    pages,
    page,
    pageSize,
    isDark,
    borderColorClass,
    lineBgClass,
    badgeBgClass,
}) => {
    return (
        <div className="flex-1 overflow-y-auto max-h-[65vh] pr-4 word-table-scroll">
            <div className="flex flex-col items-start gap-0">
                <div className="relative mb-6">
                    <div
                        className="flex items-center absolute left-0 -top-3 z-10"
                        style={{ pointerEvents: "none" }}
                    >
                        <div className={`flex-1 h-0.5 ${lineBgClass}`} />
                        <span
                            className={`mx-2 text-xs font-mono px-1 ${badgeBgClass}`}
                            style={{ userSelect: "none" }}
                        >
                            {(page - 1) * pageSize + 1}
                        </span>
                        <div className={`flex-1 h-0.5 ${lineBgClass}`} />
                    </div>
                </div>

                {pages.map((pageData, index) => {
                    const globalPageNumber = (page - 1) * pageSize + index + 1;
                    const isLast = index === pages.length - 1;

                    return (
                        <div
                            key={index}
                            className="w-full flex flex-col items-start relative mb-8"
                        >
                            <div
                                className={`flex items-center w-full absolute left-0 -top-3 z-10`}
                                style={{ pointerEvents: "none" }}
                            >
                                <div
                                    className={`flex-1 h-0.5 ${lineBgClass} mr-[-10px]`}
                                />
                                <span
                                    className={`mx-2 text-xs font-mono px-1 ${badgeBgClass}`}
                                    style={{ userSelect: "none" }}
                                >
                                    {globalPageNumber}
                                </span>
                                <div
                                    className={`flex-1 h-0.5 ${lineBgClass} ml-[-10px]`}
                                />
                            </div>

                            <div
                                className={`relative w-full border-l-2 border-r-2 ${
                                    isLast ? "border-b-2" : ""
                                } ${borderColorClass} ${
                                    isDark
                                        ? "bg-gray-800 text-gray-100"
                                        : "bg-white text-gray-800"
                                }`}
                                style={{
                                    marginTop: -3,
                                    marginBottom: -28,
                                }}
                            >
                                <div className="px-6 py-4 whitespace-pre-wrap pt-5 pd-5">
                                    {pageData.t}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
