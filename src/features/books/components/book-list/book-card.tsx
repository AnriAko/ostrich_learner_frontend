import React from "react";
import { BookOverviewDto } from "../../dto/book-overview.dto";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { useTranslation } from "react-i18next";
import { BookTitleBlock } from "./book-title-block";
import { BookProgressBar } from "./book-progress-bar";
import { BookActionButton } from "./book-action-button";
import { BookContextMenuWrapper } from "./book-context-menu-wrapper";
import { Link } from "react-router-dom";

interface Props {
    book: BookOverviewDto;
    isEditing: boolean;
    isMenuOpen: boolean;
    menuPos: { x: number; y: number } | null;
    onContextMenu: (pos: { x: number; y: number }) => void;
    onCancelEdit: () => void;
    onEditConfirm: (newTitle: string) => void;
    onStartEdit: () => void;
    onDelete: () => void;
    onCloseMenu: () => void;
}

export const BookCard: React.FC<Props> = ({
    book,
    isEditing,
    isMenuOpen,
    menuPos,
    onContextMenu,
    onCancelEdit,
    onEditConfirm,
    onStartEdit,
    onDelete,
    onCloseMenu,
}) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const isDark = theme === "dark";

    const progressPercent = (() => {
        const { lastViewedPage, lastViewedPageSize, p_count } = book;
        if (
            typeof lastViewedPage === "number" &&
            typeof lastViewedPageSize === "number" &&
            typeof p_count === "number" &&
            p_count > 0 &&
            lastViewedPage > 0
        ) {
            const completed = (lastViewedPage - 1) * lastViewedPageSize;
            return Math.min((completed / p_count) * 100, 100);
        }
        return 0;
    })();

    const bgClass = isDark
        ? `bg-gray-800 text-gray-300 border-gray-700 ${
              isMenuOpen ? "" : "hover:bg-gray-900"
          }`
        : `bg-white text-gray-700 border-gray-300 ${
              isMenuOpen ? "" : "hover:bg-gray-100"
          }`;

    const buttonLabel =
        progressPercent > 0
            ? t("bookOverview.continueReading")
            : t("bookOverview.startReading");

    const linkTarget = `/dashboard/books/${book._id}?page=${
        book.lastViewedPage ?? 1
    }&pageSize=${book.lastViewedPageSize ?? 1}`;

    return (
        <div
            className={`group border rounded-lg p-4 flex flex-col justify-start cursor-pointer ${bgClass} min-w-[150px] min-h-[120px] h-[25vh] basis-[18%] mb-[2%]`}
            title={!isEditing ? book.b : undefined}
            onContextMenu={(e) => {
                e.preventDefault();
                if (!isEditing) {
                    onContextMenu({ x: e.clientX, y: e.clientY });
                }
            }}
        >
            <Link
                to={linkTarget}
                className="flex flex-col flex-1 no-underline focus:outline-none"
                onClick={(e) => {
                    if (isEditing || isMenuOpen) {
                        e.preventDefault();
                    }
                }}
            >
                <div className="flex flex-col flex-1 justify-between">
                    <div>
                        <BookTitleBlock
                            isEditing={isEditing}
                            title={book.b}
                            onCancel={onCancelEdit}
                            onConfirm={onEditConfirm}
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        {progressPercent > 0 && (
                            <BookProgressBar percent={progressPercent} />
                        )}
                        <BookActionButton label={buttonLabel} />
                    </div>
                </div>
            </Link>

            {isMenuOpen && menuPos && (
                <BookContextMenuWrapper
                    pos={menuPos}
                    onClose={onCloseMenu}
                    onEditStart={onStartEdit}
                    onDelete={onDelete}
                    bookId={book._id}
                />
            )}
        </div>
    );
};
