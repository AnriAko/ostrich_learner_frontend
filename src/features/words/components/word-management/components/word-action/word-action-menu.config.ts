import { TFunction } from "i18next";
import { Ban, Trash2, Layers, ClipboardList } from "lucide-react";

interface WordActionButtonsParams {
    t: TFunction;
    selectedIds: string[];
    onClearSelection: () => void;
    onDeleteSelected?: (ids: string[]) => void;
    onEditSelected?: (ids: string[]) => void;
    onStartFlashcards?: (ids: string[]) => void;
    onStartTests?: (ids: string[]) => void;
}

interface WordActionButton {
    label: string;
    className: string;
    onClick: () => void;
    icon: React.ElementType;
}

export const getWordActionButtons = ({
    t,
    selectedIds,
    onClearSelection,
    onDeleteSelected,
    onStartFlashcards,
    onStartTests,
}: WordActionButtonsParams): WordActionButton[] => {
    const buttons: WordActionButton[] = [];

    if (onStartFlashcards) {
        buttons.push({
            label: t("wordActionMenu.createFlashcards"),
            className: "btn btn-success",
            onClick: () => onStartFlashcards(selectedIds),
            icon: Layers,
        });
    }

    if (onStartTests) {
        buttons.push({
            label: t("wordActionMenu.createTests"),
            className: "btn btn-primary",
            onClick: () => onStartTests(selectedIds),
            icon: ClipboardList,
        });
    }

    buttons.push({
        label: t("wordActionMenu.clearSelection"),
        className: "btn btn-secondary",
        onClick: onClearSelection,
        icon: Ban,
    });

    if (onDeleteSelected) {
        buttons.push({
            label: t("wordActionMenu.delete"),
            className: "btn btn-danger",
            onClick: () => onDeleteSelected(selectedIds),
            icon: Trash2,
        });
    }

    return buttons;
};
