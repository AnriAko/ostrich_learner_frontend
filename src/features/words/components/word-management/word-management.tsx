import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGetFilteredWords } from "../../hooks/use-word";
import { WordTable } from "./components/word-table/word-table";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../user-config/types/theme";
import { useWordFilters } from "./hooks/useWordFilters";
import { WordManagementHeader } from "./components/word-management-header";
import { useStartFlashcards } from "../study-words/flashcards/hooks/use-flashcards";
import { useStartTests } from "../study-words/test-words/hooks/test-hooks/use-start-test";

const WordManagement: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { filters, updateFilterField } = useWordFilters();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const { data, isLoading, error, refetch } = useGetFilteredWords(filters);
    const maxPage = data ? Math.ceil(data.total / (filters.pageSize ?? 10)) : 1;

    useEffect(() => {
        refetch();
    }, [filters, refetch]);

    const [cachedData, setCachedData] = useState<typeof data | null>(null);
    useEffect(() => {
        if (data) setCachedData(data);
    }, [data]);

    const isInitialLoad = isLoading && !cachedData;
    const containerBg = theme === Theme.dark ? "bg-gray-900" : "bg-gray-200";

    const startFlashcards = useStartFlashcards(cachedData!, selectedIds);
    const startTests = useStartTests(cachedData!, selectedIds);

    return (
        <div className={`p-6 ${containerBg} h-[80vh] flex flex-col`}>
            <WordManagementHeader
                theme={theme}
                total={data?.total}
                page={filters.page ?? 1}
                pageSize={filters.pageSize ?? 10}
                maxPage={maxPage}
                selectedIds={selectedIds}
                onClearSelection={() => setSelectedIds([])}
                onPageChange={(val) => updateFilterField("page", val)}
                onPageSizeChange={(val) => updateFilterField("pageSize", val)}
                onStartFlashcards={startFlashcards}
                onStartTests={startTests}
            />

            <div className="flex-1 overflow-y-auto min-h-0 word-table-scroll">
                {isInitialLoad && (
                    <div className="p-4 text-center text-gray-500">
                        {t("loading")}
                    </div>
                )}
                {error && <p>Error: {error.message}</p>}
                {!isInitialLoad && cachedData && (
                    <WordTable
                        words={cachedData.data}
                        sortBy={filters.sortBy}
                        sortOrder={filters.sortOrder}
                        onSortChange={(field) => {
                            if (filters.sortBy === field) {
                                updateFilterField(
                                    "sortOrder",
                                    filters.sortOrder === "asc" ? "desc" : "asc"
                                );
                            } else {
                                updateFilterField("sortBy", field);
                                updateFilterField("sortOrder", "asc");
                            }
                        }}
                        selectedIds={selectedIds}
                        onSelectionChange={setSelectedIds}
                    />
                )}
            </div>
        </div>
    );
};

export default WordManagement;
