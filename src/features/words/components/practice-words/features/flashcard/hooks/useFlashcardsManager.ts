import { useEffect, useState } from "react";
import { useUser } from "../../../../../../../shared/context/user-context/use-user";
import { useGetAvailableForLearning } from "../../../../../hooks/use-word";
import type { WordDto } from "../../../../../dto/word.dto";

const LOCAL_STORAGE_FLASHCARDS = "flashcards_words";

export function useFlashcardsManager(count: number, selectedWords?: string[]) {
    const [flashcards, setFlashcards] = useState<WordDto[]>([]);
    const { user } = useUser();
    const userId = user?.userId;

    const { data, isLoading, isError, error } = useGetAvailableForLearning(
        userId!
    );

    useEffect(() => {
        if (!data || count <= 0) return;

        let result: WordDto[];

        if (selectedWords && selectedWords.length > 0) {
            result = data.filter((word) => selectedWords.includes(word.origin));
        } else {
            const shuffled = [...data].sort(() => 0.5 - Math.random());
            result = shuffled.slice(0, count);
        }

        setFlashcards(result);
        localStorage.setItem(LOCAL_STORAGE_FLASHCARDS, JSON.stringify(result));
    }, [data, count, selectedWords]);

    return {
        flashcards,
        loading: isLoading,
        error: isError ? (error as Error).message : null,
    };
}
