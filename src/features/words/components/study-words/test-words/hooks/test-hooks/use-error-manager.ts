import { useCallback, useState } from "react";
import { TestCard } from "./types/test";

export const useErrorManager = () => {
    const [errors, setErrors] = useState<TestCard[]>([]);

    const addErrorCard = useCallback((card: TestCard) => {
        setErrors((prev) =>
            prev.find((c) => c.id === card.id) ? prev : [...prev, { ...card }]
        );
    }, []);

    const removeErrorCard = useCallback((card: TestCard) => {
        setErrors((prev) => prev.filter((c) => c.id !== card.id));
    }, []);

    return { errors, addErrorCard, removeErrorCard };
};
