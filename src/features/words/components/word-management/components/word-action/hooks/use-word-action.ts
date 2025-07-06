import { useDeleteWord } from "../../../../../hooks/use-word";
import { useTheme } from "../../../../../../../shared/context/theme-context/use-theme";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useDeleteWordsLogic = (
    onSuccessCallback?: () => void,
    onErrorCallback?: (err: any) => void
) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const deleteWordMutation = useDeleteWord();

    const deleteWords = async (ids: string[]) => {
        if (ids.length === 0) return;

        const confirmed = window.confirm(
            t("wordActionMenu.deleteConfirm", { count: ids.length })
        );
        if (!confirmed) return;

        try {
            await Promise.all(
                ids.map((id) => deleteWordMutation.mutateAsync(id))
            );

            toast.success(
                t("wordActionMenu.deleteSuccess", { count: ids.length }),
                {
                    theme,
                    toastId: "delete-success",
                }
            );

            onSuccessCallback?.();
        } catch (err: any) {
            toast.error(
                t("errors.default") + ": " + (err?.message || "Unknown error"),
                {
                    theme,
                    toastId: "delete-error",
                }
            );

            onErrorCallback?.(err);
        }
    };

    return {
        deleteWords,
        isDeleting: deleteWordMutation.isPending,
    };
};
