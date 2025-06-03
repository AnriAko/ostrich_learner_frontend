import React from "react";
import { useTranslation } from "react-i18next";
import { getWordActionButtons } from "./word-action-menu.config";
import { useTheme } from "../../../../../../shared/context/theme-context/use-theme";
import { useDeleteWordsLogic } from "./hooks/use-word-action";

interface WordActionMenuProps {
    selectedIds: string[];
    onClearSelection: () => void;
    onEditSelected?: (ids: string[]) => void;
    onStartFlashcards?: (ids: string[]) => void;
    onStartTests?: (ids: string[]) => void; // ✅ Новый пропс
    refetch?: () => void;
}

export const WordActionMenu: React.FC<WordActionMenuProps> = ({
    selectedIds,
    onClearSelection,
    onEditSelected,
    onStartFlashcards, // ✅ Принимаем
    refetch,
    onStartTests,
}) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { deleteWords } = useDeleteWordsLogic(() => {
        onClearSelection();
        refetch?.();
    });

    if (selectedIds.length === 0) return null;

    const buttons = getWordActionButtons({
        t,
        selectedIds,
        onClearSelection,
        onDeleteSelected: deleteWords,
        onEditSelected,
        onStartFlashcards,
        onStartTests,
    });

    const themeClasses = isDark
        ? {
              button: "bg-yellow-300 text-gray-800 hover:bg-yellow-200",
          }
        : {
              button: "bg-blue-500 text-white hover:bg-blue-600",
          };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-2 py-1 text-xs rounded-sm w-max max-w-full mb-2">
            <span className="text-xs font-medium">
                {t("wordActionMenu.selectedCount", {
                    count: selectedIds.length,
                })}
            </span>

            <div className="flex flex-wrap items-center gap-2">
                {buttons.map(({ label, onClick, icon: Icon }, idx) => (
                    <button
                        key={idx}
                        onClick={onClick}
                        className={`h-5 px-2 text-xs rounded font-medium transition leading-none flex items-center gap-1 cursor-pointer ${themeClasses.button}`}
                    >
                        <Icon size={14} />
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};
