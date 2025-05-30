import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // импорт
import { useGetFilteredWords } from "../../hooks/use-word";
import { useUser } from "../../../../shared/context/user-context/use-user";
import { WordFilterDto } from "./dto/word-filter.dto";
import { WordTable } from "./word-table/word-table";
import { PaginationControls } from "./pagination-control";
import "./word-management.css";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../user-config/types/theme";

const WordManagement: React.FC = () => {
    const { t } = useTranslation(); // хук перевода
    const { user } = useUser();
    const { theme } = useTheme();

    const [filters, setFilters] = useState<WordFilterDto>({
        userId: user!.userId,
        origin: "",
        translation: "",
        page: 1,
        pageSize: 20,
        sortBy: "creationDate",
        sortOrder: "desc",
    });

    const { data, isLoading, error, refetch } = useGetFilteredWords(filters);

    const maxPage = data ? Math.ceil(data.total / (filters.pageSize ?? 10)) : 1;

    useEffect(() => {
        if (user?.userId && filters.userId !== user.userId) {
            setFilters((prev) => ({
                ...prev,
                userId: user.userId,
                page: 1,
            }));
        }
    }, [user?.userId, filters.userId]);

    useEffect(() => {
        refetch();
    }, [filters, refetch]);

    const updateFilterField = <K extends keyof WordFilterDto>(
        field: K,
        value: WordFilterDto[K]
    ) => {
        setFilters((prev) => {
            if (field === "page") {
                return { ...prev, [field]: value };
            } else {
                return { ...prev, [field]: value, page: 1 };
            }
        });
    };

    const containerBg = theme === Theme.dark ? "bg-gray-900" : "bg-gray-200";
    const titleColor =
        theme === Theme.dark ? "text-yellow-300" : "text-blue-600";

    const [cachedData, setCachedData] = React.useState<typeof data | null>(
        null
    );

    React.useEffect(() => {
        if (data) {
            setCachedData(data); // обновляем кеш, когда приходит новый ответ
        }
    }, [data]);

    const isInitialLoad = isLoading && !cachedData; // загрузка и нет кеша — первый раз

    return (
        <div className={`p-4 ${containerBg} h-[80vh] flex flex-col`}>
            <h2 className={`text-xl font-bold mb-4 ${titleColor}`}>
                {t("manageWords")}
            </h2>

            <div className="flex-1 overflow-y-auto min-h-0 word-table-scroll">
                <PaginationControls
                    page={filters.page ?? 1}
                    pageSize={filters.pageSize ?? 10}
                    onPageChange={(val) => updateFilterField("page", val)}
                    onPageSizeChange={(val) =>
                        updateFilterField("pageSize", val)
                    }
                    maxPage={maxPage}
                />

                {isInitialLoad && (
                    <div className="p-4 text-center text-gray-500">
                        {/* Можно заменить на скелетон */}
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
                    />
                )}
            </div>
        </div>
    );
};

export default WordManagement;
