import { useMutation } from "@tanstack/react-query";
import { processTestResults } from "../../service/test-service";
import { TestResult } from "../test-hooks/types/test";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useProcessTestResults = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationKey: ["process-test-results"],
        mutationFn: (results: TestResult[]) => processTestResults(results),
        onSuccess: () => {
            toast.success(
                t("tests.successSubmit", "Successfully submitted results!")
            );
        },
        onError: () => {
            toast.error(
                t("tests.errorSubmit", "Something went wrong during submit")
            );
        },
    });
};
