import { useMutation } from "@tanstack/react-query";
import { processTestResults } from "../../service/test-service";
import { TestResult } from "../test-hooks/types/test";
import { toast } from "react-toastify";

export const useProcessTestResults = () => {
    return useMutation({
        mutationKey: ["process-test-results"],
        mutationFn: (results: TestResult[]) => processTestResults(results),
        onSuccess: () => {
            toast.success("Successfully submitted results!");
        },
        onError: () => {
            toast.error("Something went wrong during submit");
        },
    });
};
