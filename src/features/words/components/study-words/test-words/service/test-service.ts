import api from "../../../../../../shared/api/axios-instance";
import { TestResult } from "../hooks/test-hooks/types/test";

export const checkWordAnswer = async ({
    id,
    origin,
    translation,
    userId,
}: {
    id: number;
    origin: string;
    translation: string;
    userId: string;
}): Promise<"directMatch" | "userHasThisTranslation" | "noMatch"> => {
    try {
        const { data } = await api.post(`/word/${id}/check-answer`, {
            origin,
            translation,
            userId,
        });
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const processTestResults = async (
    results: TestResult[]
): Promise<void> => {
    try {
        await api.post("/word/process-test-results", results);
    } catch (error) {
        console.error("Error processing test results:", error);
        throw error;
    }
};
