import { useMutation } from "@tanstack/react-query";
import { checkWordAnswer } from "../../service/test-service";
import { IsCorrectType } from "../test-hooks/types/test";

type CheckAnswerParams = {
    id: number;
    origin: string;
    translation: string;
    userId: string;
};

export const useCheckAnswerBackend = (userId: string) => {
    return useMutation<
        IsCorrectType,
        unknown,
        Omit<CheckAnswerParams, "userId">
    >({
        mutationKey: ["check-word-answer"],
        mutationFn: ({ id, origin, translation }) =>
            checkWordAnswer({ id, origin, translation, userId }),
    });
};
