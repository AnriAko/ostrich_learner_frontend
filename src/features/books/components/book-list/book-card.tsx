import React from "react";
import { BookOverviewDto } from "../../dto/book-overview.dto";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { useTranslation } from "react-i18next";
import { BookTitleBlock } from "./book-title-block";
import { BookProgressBar } from "./book-progress-bar";
import { BookActionButton } from "./book-action-button";
import { BookContextMenuWrapper } from "./book-context-menu-wrapper";

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
            <div className="flex flex-col flex-1">
                <BookTitleBlock
                    isEditing={isEditing}
                    title={book.b}
                    onCancel={onCancelEdit}
                    onConfirm={onEditConfirm}
                />
                {progressPercent > 0 && (
                    <BookProgressBar percent={progressPercent} />
                )}
            </div>

            <BookActionButton label={buttonLabel} />

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
