import React from "react";
import { PageNumberLine } from "./page-number-badge";
import { BookPageBlock } from "./book-page-block";
import { BookPageRawDto } from "../../../dto/book.dto";

interface BookPageListProps {
    bookId: string;
    pages: BookPageRawDto[];
    page: number;
    pageSize: number;
    isDark: boolean;
    borderColorClass: string;
    lineBgClass: string;
    badgeBgClass: string;
    fontSize: number;
}

export const BookPageList: React.FC<BookPageListProps> = ({
    bookId,
    pages,
    page,
    pageSize,
    isDark,
    borderColorClass,
    lineBgClass,
    badgeBgClass,
    fontSize,
}) => {
    const firstGlobalPage = (page - 1) * pageSize + 1;

    return (
        <div className="flex-1 overflow-y-auto max-h-[64vh] pr-4 word-table-scroll">
            <div className="flex flex-col items-start gap-0 min-w-[370px]">
                <PageNumberLine
                    number={firstGlobalPage}
                    lineBgClass={lineBgClass}
                    badgeBgClass={badgeBgClass}
                />

                {pages.map((pageData, index) => {
                    return (
                        <BookPageBlock
                            key={index}
                            bookId={bookId}
                            pageText={pageData.t}
                            translations={pageData.tr || []}
                            globalPageNumber={firstGlobalPage + index}
                            isLast={index === pages.length - 1}
                            isDark={isDark}
                            fontSize={fontSize}
                            lineBgClass={lineBgClass}
                            badgeBgClass={badgeBgClass}
                            borderColorClass={borderColorClass}
                        />
                    );
                })}
            </div>
        </div>
    );
};
