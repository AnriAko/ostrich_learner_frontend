import React, { useEffect, useRef } from "react";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { BookPageList } from "./book-page-list/book-page-list";
import { BookSidePanel } from "./book-side-panel/book-side-panel";
import { VerticalResizer } from "./vertical-resizer";
import { BookPageRawDto } from "../../dto/book.dto";

interface BookReaderContentProps {
    bookId: string;
    pages: BookPageRawDto[];
    page: number;
    pageSize: number;
    selectedWord: {
        origin: string;
        posId: number;
        pageIndex: number;
    } | null;
    onWordClick: (info: {
        origin: string;
        posId: number;
        pageIndex: number;
    }) => void;
}

export const BookReaderContent: React.FC<BookReaderContentProps> = ({
    bookId,
    pages,
    page,
    pageSize,
    selectedWord,
    onWordClick,
}) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const containerRef = useRef<HTMLDivElement>(null);
    const storageKey = `bookReader:leftWidth:${bookId}`;

    const getInitialWidth = () => {
        const saved = localStorage.getItem(storageKey);
        return saved ? parseInt(saved, 10) : 600;
    };

    const [leftWidth, setLeftWidth] = React.useState<number>(getInitialWidth);
    const [fontSize, setFontSize] = React.useState<number>(16);

    const handleResize = (newLeftWidth: number) => {
        setLeftWidth(newLeftWidth);
        localStorage.setItem(storageKey, newLeftWidth.toString());
    };

    useEffect(() => {
        const handleHover = (e: MouseEvent) => {
            document
                .querySelectorAll("span[data-posid].hovered-word")
                .forEach((el) => {
                    el.classList.remove("hovered-word");
                });

            const target = e.target as HTMLElement;
            const span = target.closest(
                "span[data-posid]"
            ) as HTMLSpanElement | null;

            if (span) {
                span.classList.add("hovered-word");
            }
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const span = target.closest(
                "span[data-posid]"
            ) as HTMLSpanElement | null;
            const pageDiv = span?.closest(
                "div[data-pageid]"
            ) as HTMLDivElement | null;

            if (span && pageDiv) {
                const posId = Number(span.dataset.posid);
                const pageIndex = Number(pageDiv.dataset.pageid);
                const origin = span.textContent || "";

                onWordClick({ origin, posId, pageIndex });
            }
        };

        document.addEventListener("mouseover", handleHover);
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("mouseover", handleHover);
            document.removeEventListener("click", handleClick);
        };
    }, [onWordClick]);

    const borderColorClass = isDark ? "border-gray-700" : "border-gray-300";
    const lineBgClass = isDark ? "bg-gray-700" : "bg-gray-300";
    const badgeBgClass = isDark
        ? "bg-transparent text-gray-300"
        : "bg-transparent text-gray-500";

    const containerBgClass = isDark
        ? "bg-gray-900 text-gray-100"
        : "bg-gray-200 text-gray-900";

    return (
        <div className={`flex flex-col flex-1 gap-4 ${containerBgClass}`}>
            <div ref={containerRef} className="flex flex-1 overflow-hidden">
                <div style={{ width: leftWidth }} className="overflow-hidden">
                    <BookPageList
                        bookId={bookId}
                        pages={pages}
                        page={page}
                        pageSize={pageSize}
                        isDark={isDark}
                        borderColorClass={borderColorClass}
                        lineBgClass={lineBgClass}
                        badgeBgClass={badgeBgClass}
                        fontSize={fontSize}
                    />
                </div>

                <VerticalResizer
                    containerRef={containerRef}
                    onResizeTo={handleResize}
                    minWidth={390}
                    sidebarWidth={320}
                />

                <BookSidePanel
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    page={selectedWord?.pageIndex ?? page}
                    posId={selectedWord?.posId ?? 0}
                    origin={selectedWord?.origin ?? ""}
                />
            </div>
        </div>
    );
};
