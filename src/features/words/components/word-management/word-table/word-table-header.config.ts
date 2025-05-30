import { WordFilterDto } from "../dto/word-filter.dto";

export interface TableHeader {
    field: WordFilterDto["sortBy"];
    label: string;
    type?: "date" | "datetime";
}

export const getWordTableHeaders = (
    t: (key: string, defaultValue: string) => string
): TableHeader[] => [
    { field: "origin", label: t("table.origin", "Origin") },
    { field: "translation", label: t("table.translation", "Translation") },
    { field: "vocabularyName", label: t("table.vocabulary", "Vocabulary") },
    { field: "memoryScore", label: t("table.memoryScore", "Memory Score") },
    {
        field: "learningDate",
        label: t("table.learned", "Learned"),
        type: "date",
    },
    {
        field: "dateForRepetition",
        label: t("table.repeat", "Repeat"),
        type: "date",
    },
    {
        field: "creationDate",
        label: t("table.addedToVocab", "Added to Vocab"),
        type: "datetime",
    },
];
