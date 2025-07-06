import React, { useState, useEffect } from "react";
import { BookOverviewDto } from "../dto/book-overview.dto";
import { useUpdateBookTitle, useDeleteBook } from "../hooks/use-book";
import { toast } from "react-toastify";
import { useTheme } from "../../../shared/context/theme-context/use-theme";
import { BookMenu } from "./book-menu";
import { EditTitle } from "./edit-title";

interface BookListProps {
    books: BookOverviewDto[];
}

export const BookList: React.FC<BookListProps> = ({ books }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [menuBookId, setMenuBookId] = useState<string | null>(null);
    const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(
        null
    );
    const [editingBookId, setEditingBookId] = useState<string | null>(null);

    const updateTitle = useUpdateBookTitle();
    const deleteBook = useDeleteBook();

    useEffect(() => {
        const handleClickOutside = () => {
            setMenuBookId(null);
            setMenuPos(null);
            setEditingBookId(null);
        };
        if (menuBookId || editingBookId) {
            document.addEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuBookId, editingBookId]);

    const calcProgress = (book: BookOverviewDto) => {
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
    };

    const handleContextMenu = (
        e: React.MouseEvent<HTMLDivElement>,
        bookId: string
    ) => {
        e.preventDefault();
        if (editingBookId) return;
        setMenuBookId(bookId);
        setMenuPos({ x: e.clientX, y: e.clientY });
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBook.mutateAsync(id);
            toast.success("Book deleted successfully");
        } catch {
            toast.error("Failed to delete book");
        } finally {
            setMenuBookId(null);
            setMenuPos(null);
        }
    };

    const handleUpdateTitleClick = () => {
        if (menuBookId) {
            setEditingBookId(menuBookId);
            setMenuBookId(null);
            setMenuPos(null);
        }
    };

    const handleConfirmEdit = async (newTitle: string) => {
        if (!editingBookId) return;

        try {
            await updateTitle.mutateAsync({
                id: editingBookId,
                userId:
                    books.find((b) => b._id === editingBookId)?.userId || "",
                title: newTitle,
            });
            toast.success("Book renamed successfully");
        } catch {
            toast.error("Failed to rename book");
        }

        setEditingBookId(null);
    };

    return (
        <div className="w-full h-[70vh] overflow-y-auto pr-1 relative">
            <div className="flex flex-wrap gap-[2%]">
                {books.map((book) => {
                    const progressPercent = calcProgress(book);
                    const isEditing = editingBookId === book._id;
                    const showMenu = menuBookId === book._id && !isEditing;
                    const isMenuOpenForThisBook = menuBookId === book._id;

                    const baseClass = isDark
                        ? `bg-gray-800 text-gray-300 border-gray-700 ${
                              isMenuOpenForThisBook ? "" : "hover:bg-gray-900"
                          }`
                        : `bg-white text-gray-700 border-gray-300 ${
                              isMenuOpenForThisBook ? "" : "hover:bg-gray-100"
                          }`;

                    return (
                        <div
                            key={book._id}
                            className={`border rounded-lg p-4 flex flex-col justify-start cursor-pointer ${baseClass} min-w-[150px] min-h-[120px] h-[25vh] basis-[18%] mb-[2%]`}
                            title={!isEditing ? book.b : undefined}
                            onContextMenu={(e) =>
                                handleContextMenu(e, book._id)
                            }
                        >
                            {isEditing ? (
                                <EditTitle
                                    initialValue={book.b}
                                    onCancel={() => setEditingBookId(null)}
                                    onConfirm={handleConfirmEdit}
                                />
                            ) : (
                                <div
                                    className="font-semibold w-full mb-2 break-words line-clamp-4 overflow-hidden text-ellipsis"
                                    title={book.b}
                                >
                                    {book.b}
                                </div>
                            )}

                            <div
                                className={`w-full ${
                                    isDark ? "bg-gray-700" : "bg-gray-400"
                                } rounded-full h-3 overflow-hidden mt-auto`}
                            >
                                <div
                                    className={`h-3 rounded-full ${
                                        isDark ? "bg-yellow-300" : "bg-blue-500"
                                    }`}
                                    style={{
                                        width: `${progressPercent.toFixed(0)}%`,
                                    }}
                                />
                            </div>
                            <div className="text-xs mt-1">
                                {progressPercent.toFixed(0)}%
                            </div>

                            {showMenu && menuPos && (
                                <div
                                    style={{
                                        position: "fixed",
                                        top: menuPos.y,
                                        left: menuPos.x,
                                        transform: "translate(4px, 4px)",
                                        zIndex: 50,
                                    }}
                                >
                                    <BookMenu
                                        bookId={book._id}
                                        onClose={() => {
                                            setMenuBookId(null);
                                            setMenuPos(null);
                                        }}
                                        onEditStart={() =>
                                            handleUpdateTitleClick()
                                        }
                                        onDelete={() => handleDelete(book._id)}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
