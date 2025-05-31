import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { WordDto } from "../../dto/word.dto";

export const useStartFlashcards = (
    cachedData: { data: WordDto[] } | null,
    selectedIds: string[]
) => {
    const navigate = useNavigate();

    const start = useCallback(() => {
        if (!cachedData) return;

        const selected = cachedData.data
            .filter((word) => selectedIds.includes(word.id.toString()))
            .map((word) => ({
                id: word.id,
                origin: word.origin,
                translation: word.translation,
            }));

        navigate("/dashboard/study", { state: { words: selected } });
    }, [cachedData, selectedIds, navigate]);

    return start;
};
