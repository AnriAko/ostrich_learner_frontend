import { useTranslation } from "react-i18next";
import { AddWordForm } from "./add-word-form";
import { MessageBox } from "./message-box";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../user-config/types/theme";

export const AddWordsPage = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const bgClass = isDark ? "bg-gray-900" : "bg-gray-200";
    const textClass = isDark ? "text-yellow-300" : "text-blue-600";

    return (
        <div className={`max-w-xl mx-auto mt-8 p-6 rounded shadow ${bgClass}`}>
            <h1 className={`text-xl font-bold mb-4 ${textClass}`}>
                {t("addWordsPage.title", "Add a new word")}
            </h1>

            <MessageBox />

            <AddWordForm />
        </div>
    );
};

export default AddWordsPage;
