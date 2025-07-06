import React from "react";
import { useTranslation } from "react-i18next";
import { PaginationControls } from "../../../../../shared/components/pagination-control";
import { WordActionMenu } from "./word-action/word-action-menu";
import { Theme } from "../../../../user-config/types/theme";

interface Props {
    theme: string;
    total: number | undefined;
    page: number;
    pageSize: number;
    maxPage: number;
    selectedIds: string[];
    onClearSelection: () => void;
    onPageChange: (val: number) => void;
    onPageSizeChange: (val: number) => void;
    onStartFlashcards: () => void;
    onStartTests: () => void;
}

export const WordManagementHeader: React.FC<Props> = ({
    theme,
    total,
    page,
    pageSize,
    maxPage,
    selectedIds,
    onClearSelection,
    onPageChange,
    onPageSizeChange,
    onStartFlashcards,
    onStartTests,
}) => {
    const { t } = useTranslation();
    const titleColor =
        theme === Theme.dark ? "text-yellow-300" : "text-blue-600";

    return (
        <>
            <h2 className={`text-xl font-bold mb-4 ${titleColor}`}>
                {t("manageWords")}
            </h2>
            <div className="flex flex-row gap-5 mb-2">
                <PaginationControls
                    page={page}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                    maxPage={maxPage}
                    totalItems={total}
                    pageSizeOptions={[10, 20, 30, 40, 50]}
                    itemsPerPageLabel={t("pagination.wordsPerPage")}
                    totalFoundLabel={(count) =>
                        t("pagination.totalWordsFound", { count })
                    }
                />
                <WordActionMenu
                    selectedIds={selectedIds}
                    onClearSelection={onClearSelection}
                    onStartFlashcards={onStartFlashcards}
                    onStartTests={onStartTests}
                />
            </div>
        </>
    );
};
