import React, { useState, useEffect } from "react";
import {
    useGetFilteredWords,
    useDeleteWord,
    useUpdateWord,
} from "../../hooks/use-word";
import { useUser } from "../../../../shared/context/user-context/use-user";
import { WordDto } from "../../dto/word.dto";
import { WordFilterDto } from "../../dto/word-filter.dto";
import { WordTable } from "./word-table";
import { WordFilters } from "./word-filters";
import { Pagination } from "./pagination-controls";

const WordManagement: React.FC = () => {
    const { user } = useUser();
    const [editingWord, setEditingWord] = useState<WordDto | null>(null);
    const [editedOrigin, setEditedOrigin] = useState<string>("");
    const [editedTranslation, setEditedTranslation] = useState<string>("");

    const [filters, setFilters] = useState<WordFilterDto>({
        userId: user!.userId,
        origin: "",
        translation: "",
        memoryScore: undefined,
        page: 1,
        pageSize: 10,
        sortBy: "id",
        sortOrder: "ASC",
    });

    const { data, isLoading, error, refetch } = useGetFilteredWords(filters);
    const deleteMutation = useDeleteWord();
    const updateMutation = useUpdateWord();

    useEffect(() => {
        if (user?.userId && filters.userId !== user.userId) {
            setFilters((prev) => ({ ...prev, userId: user.userId, page: 1 }));
        }
    }, [user?.userId]);

    useEffect(() => {
        refetch();
    }, [filters]);

    const updateFilterField = (field: keyof WordFilterDto, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
            page: 1,
        }));
    };

    const handleEdit = (word: WordDto) => {
        setEditingWord(word);
        setEditedOrigin(word.origin);
        setEditedTranslation(word.translation);
    };

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id, {
            onSuccess: refetch,
        });
    };

    const handleSaveEdit = () => {
        if (!editingWord) return;
        updateMutation.mutate(
            {
                id: editingWord.id.toString(),
                data: {
                    ...editingWord,
                    origin: editedOrigin,
                    translation: editedTranslation,
                },
            },
            {
                onSuccess: () => {
                    setEditingWord(null);
                    refetch();
                },
            }
        );
    };

    const handleCancelEdit = () => setEditingWord(null);

    const handleNextPage = () => {
        const currentPage = filters.page ?? 1;
        const pageSize = filters.pageSize ?? 10;
        if (data && data.total > currentPage * pageSize) {
            setFilters((prev) => ({ ...prev, page: currentPage + 1 }));
        }
    };

    const handlePrevPage = () => {
        const currentPage = filters.page ?? 1;
        if (currentPage > 1) {
            setFilters((prev) => ({ ...prev, page: currentPage - 1 }));
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Manage Words</h2>

            <WordFilters filters={filters} onFilterChange={updateFilterField} />

            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!isLoading && !error && data && (
                <>
                    <WordTable
                        words={data.data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    <Pagination
                        currentPage={filters.page}
                        total={data.total}
                        pageSize={filters.pageSize}
                        onPrev={handlePrevPage}
                        onNext={handleNextPage}
                    />
                </>
            )}

            {editingWord && (
                <div className="mt-4 p-4 border rounded bg-gray-50">
                    <h3 className="font-semibold mb-2">Edit Word</h3>
                    <input
                        className="border rounded px-2 py-1 mr-2"
                        value={editedOrigin}
                        onChange={(e) => setEditedOrigin(e.target.value)}
                    />
                    <input
                        className="border rounded px-2 py-1 mr-2"
                        value={editedTranslation}
                        onChange={(e) => setEditedTranslation(e.target.value)}
                    />
                    <button
                        onClick={handleSaveEdit}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancelEdit}
                        className="bg-gray-300 px-3 py-1 rounded"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default WordManagement;
