import React from "react";
import { useTranslation } from "react-i18next";
import { WordDto } from "../../dto/word.dto";
import { LimitSelector } from "./limit-selector";

interface StudyPageActionsProps {
    isDark: boolean;
    availableWords: WordDto[];
    repetitionWords: WordDto[];
    onStudyNew: (words: WordDto[]) => void;
    onRepeatOld: (words: WordDto[]) => void;
    onChooseWords: () => void;
    onTest: (words: WordDto[]) => void;
    limit: number;
    setLimit: (limit: number) => void;
}

export const StudyPageActions: React.FC<StudyPageActionsProps> = ({
    isDark,
    availableWords,
    repetitionWords,
    onStudyNew,
    onRepeatOld,
    onChooseWords,
    onTest,
    limit,
    setLimit,
}) => {
    const { t } = useTranslation();

    const getLimitedAmount = (words: WordDto[]): WordDto[] => {
        if (limit === -1 || words.length <= limit) {
            return words;
        }
        const shuffled = [...words].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, limit);
    };

    return (
        <div className="mt-2 text-gray-800 dark:text-gray-200 text-sm">
            <LimitSelector limit={limit} setLimit={setLimit} isDark={isDark} />

            <div className="flex flex-col md:flex-row items-center gap-2 mt-2">
                {availableWords.length > 0 && (
                    <>
                        <ActionButton
                            count={availableWords.length}
                            onClick={() => {
                                localStorage.removeItem("flashcardsSession");
                                onStudyNew(getLimitedAmount(availableWords));
                            }}
                            label={t("flashcards.studyNewWords")}
                            bgClass={
                                isDark
                                    ? "bg-green-700 hover:bg-green-800"
                                    : "bg-green-500 hover:bg-green-600"
                            }
                        />

                        <ActionButton
                            count={availableWords.length}
                            onClick={() => {
                                localStorage.removeItem("flashcardsSession");
                                onTest(getLimitedAmount(availableWords));
                            }}
                            label={t("flashcards.testNewWords")}
                            bgClass={
                                isDark
                                    ? "bg-purple-700 hover:bg-purple-800"
                                    : "bg-purple-500 hover:bg-purple-600"
                            }
                        />
                    </>
                )}

                {repetitionWords.length > 0 && (
                    <>
                        <ActionButton
                            count={repetitionWords.length}
                            onClick={() =>
                                onRepeatOld(getLimitedAmount(repetitionWords))
                            }
                            label={t("flashcards.repeatOldWords")}
                            bgClass={
                                isDark
                                    ? "bg-yellow-700 hover:bg-yellow-700"
                                    : "bg-yellow-300 hover:bg-yellow-600"
                            }
                        />

                        <ActionButton
                            count={repetitionWords.length}
                            onClick={() =>
                                onTest(getLimitedAmount(repetitionWords))
                            }
                            label={t("flashcards.testRepeatWords")}
                            bgClass={
                                isDark
                                    ? "bg-indigo-700 hover:bg-indigo-800"
                                    : "bg-indigo-500 hover:bg-indigo-600"
                            }
                        />
                    </>
                )}

                {(availableWords.length > 0 || repetitionWords.length > 0) && (
                    <span
                        className={`text-xs font-medium ${
                            isDark ? "text-gray-200" : "text-gray-800"
                        }`}
                    >
                        {t("common.or")}
                    </span>
                )}

                <button
                    onClick={onChooseWords}
                    className={`px-2 py-1.5 text-sm rounded transition text-white cursor-pointer
                        ${
                            isDark
                                ? "bg-blue-700 hover:bg-blue-800"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    {t("flashcards.chooseWords")}
                </button>
            </div>
        </div>
    );
};

const ActionButton: React.FC<{
    count: number;
    label: string;
    bgClass: string;
    onClick: () => void;
}> = ({ count, label, bgClass, onClick }) => (
    <div className="relative inline-block">
        <button
            onClick={onClick}
            className={`px-2.5 py-1.5 text-sm rounded transition text-white cursor-pointer ${bgClass}`}
        >
            {label}
        </button>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {count}
        </span>
    </div>
);
