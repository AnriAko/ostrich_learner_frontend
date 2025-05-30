// useWordFilters.ts
import { useState, useEffect } from "react";
import { WordFilterDto } from "../dto/word-filter.dto";
import { useUser } from "../../../../../shared/context/user-context/use-user";

export const useWordFilters = () => {
    const { user } = useUser();

    const [filters, setFilters] = useState<WordFilterDto>({
        userId: user!.userId,
        origin: "",
        translation: "",
        page: 1,
        pageSize: 20,
        sortBy: "creationDate",
        sortOrder: "desc",
    });

    useEffect(() => {
        if (user?.userId && filters.userId !== user.userId) {
            setFilters((prev) => ({
                ...prev,
                userId: user.userId,
                page: 1,
            }));
        }
    }, [user?.userId, filters.userId]);

    const updateFilterField = <K extends keyof WordFilterDto>(
        field: K,
        value: WordFilterDto[K]
    ) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
            ...(field !== "page" && { page: 1 }),
        }));
    };

    return { filters, updateFilterField };
};
