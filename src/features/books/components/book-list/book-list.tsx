import React, { useState, useEffect } from "react";
import { BookOverviewDto } from "../../dto/book-overview.dto";
import { useUpdateBookTitle, useDeleteBook } from "../../hooks/use-book";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { BookCard } from "./book-card";

interface BookListProps {
    books: BookOverviewDto[];
}

export const BookList: React.FC<BookListProps> = ({ books }) => {
    const { t } = useTranslation();

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

    const handleDelete = async (id: string) => {
        try {
            await deleteBook.mutateAsync(id);
            toast.success(t("bookOverview.deletedSuccess"));
        } catch {
            toast.error(t("bookOverview.deleteFailed"));
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

    return (
        <div className="w-full overflow-y-auto pr-1 relative">
            {books.length === 0 ? (
                <div className="text-center text-gray-500 py-10 text-sm">
                    {t("bookOverview.noBooks")}
                </div>
            ) : (
                <div className="flex flex-wrap gap-[15px]">
                    {books.map((book) => (
                        <BookCard
                            key={book._id}
                            book={book}
                            isEditing={editingBookId === book._id}
                            isMenuOpen={menuBookId === book._id}
                            menuPos={menuPos}
                            onContextMenu={(pos) => {
                                setMenuBookId(book._id);
                                setMenuPos(pos);
                            }}
                            onCancelEdit={() => setEditingBookId(null)}
                            onEditConfirm={async (title) => {
                                try {
                                    await updateTitle.mutateAsync({
                                        id: book._id,
                                        userId: book.userId,
                                        title,
                                    });
                                    toast.success(
                                        t("bookOverview.renameSuccess")
                                    );
                                } catch {
                                    toast.error(t("bookOverview.renameFailed"));
                                }
                                setEditingBookId(null);
                            }}
                            onStartEdit={handleUpdateTitleClick}
                            onDelete={() => handleDelete(book._id)}
                            onCloseMenu={() => {
                                setMenuBookId(null);
                                setMenuPos(null);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
