import { useNavigate } from "react-router-dom";
import { WordDto } from "../../../../../dto/word.dto";
import { useCallback } from "react";

export const useStartTests = (
    cachedData: { data: WordDto[] } | null,
    selectedIds: string[]
) => {
    const navigate = useNavigate();

    const start = useCallback(() => {
        if (!cachedData) return;

        const selectedWords = cachedData.data.filter((word) =>
            selectedIds.includes(word.id.toString())
        );

        navigate("/dashboard/study", {
            state: { words: selectedWords, mode: "test" },
        });
    }, [cachedData, selectedIds, navigate]);

    return start;
};
