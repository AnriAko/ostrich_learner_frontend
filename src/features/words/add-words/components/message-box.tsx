import { useTranslation } from "react-i18next";
import { useMessageBoxLogic } from "../hooks/use-message-box-logic";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../user-config/types/theme";

export const MessageBox = () => {
    const { t } = useTranslation();
    const { message, onPracticeClick } = useMessageBoxLogic();
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    if (!message) return null;

    const baseClasses = "mb-4 p-2 rounded";

    const successClasses = isDark
        ? "text-green-300 bg-green-900"
        : "text-green-800 bg-green-200";

    const errorClasses = isDark
        ? "text-red-300 bg-red-900"
        : "text-red-800 bg-red-200";

    const buttonClasses = isDark
        ? "ml-2 underline text-blue-400 hover:text-blue-300"
        : "ml-2 underline text-blue-600 hover:text-blue-800";

    return (
        <div
            className={`${baseClasses} ${
                message.type === "success" ? successClasses : errorClasses
            }`}
        >
            {message.text}
            {message.type === "error" && (
                <button onClick={onPracticeClick} className={buttonClasses}>
                    {t("addWordsPage.practice", "Practice now")}
                </button>
            )}
        </div>
    );
};
