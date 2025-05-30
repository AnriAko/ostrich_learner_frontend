import { TFunction } from "i18next";
import { Ban, PencilLine, Trash2, Layers } from "lucide-react";

interface WordActionButtonsParams {
    t: TFunction;
    selectedIds: string[];
    onClearSelection: () => void;
    onDeleteSelected?: (ids: string[]) => void;
    onEditSelected?: (ids: string[]) => void;
    onCreateFlashcards?: (ids: string[]) => void;
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
    onEditSelected,
    onCreateFlashcards,
}: WordActionButtonsParams): WordActionButton[] => {
    const buttons: WordActionButton[] = [
        {
            label: t("wordActionMenu.clearSelection"),
            className: "btn btn-secondary",
            onClick: onClearSelection,
            icon: Ban,
        },
    ];

    if (onEditSelected) {
        buttons.push({
            label: t("wordActionMenu.edit"),
            className: "btn btn-warning",
            onClick: () => onEditSelected(selectedIds),
            icon: PencilLine,
        });
    }

    if (onDeleteSelected) {
        buttons.push({
            label: t("wordActionMenu.delete"),
            className: "btn btn-danger",
            onClick: () => onDeleteSelected(selectedIds),
            icon: Trash2,
        });
    }

    if (onCreateFlashcards) {
        buttons.push({
            label: t("wordActionMenu.createFlashcards"),
            className: "btn btn-success",
            onClick: () => onCreateFlashcards(selectedIds),
            icon: Layers,
        });
    }

    return buttons;
};
