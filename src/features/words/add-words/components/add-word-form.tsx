import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./language-selector";
import { WordInputs } from "./word-inputs";
import { useAddWordLogic } from "../hooks/use-add-word-logic";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../user-config/types/theme";

export const AddWordForm = () => {
    const { t } = useTranslation();
    const { handleSubmit, isLoading } = useAddWordLogic();
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const formBgClass = isDark
        ? "bg-gray-800 text-white"
        : "bg-gray-100 text-black";
    const buttonBgClass = isDark
        ? "bg-yellow-600 hover:bg-yellow-700"
        : "bg-blue-600 hover:bg-blue-700";
    const buttonTextClass = "text-white";

    return (
        <form
            onSubmit={handleSubmit}
            className={`space-y-6 p-4 rounded ${formBgClass}`}
        >
            <LanguageSelector />
            <WordInputs />

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded disabled:opacity-50 ${buttonBgClass} ${buttonTextClass}`}
            >
                {t("addWordsPage.submit", "Add word")}
            </button>
        </form>
    );
};
