import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { WordDto } from "../../dto/word.dto";
import { LimitSelector } from "./limit-selector";
import { CirclePlay } from "lucide-react";

interface FlashcardActionsProps {
    isDark: boolean;
    availableWords: WordDto[];
    repetitionWords: WordDto[];
    onStudyNew: (limit?: number) => void;
    onRepeatOld: (limit?: number) => void;
    onChooseWords: () => void;
    onContinue?: () => void;
    onTest: (words: WordDto[]) => void;
}

export const FlashcardActions: React.FC<FlashcardActionsProps> = ({
    isDark,
    availableWords,
    repetitionWords,
    onStudyNew,
    onRepeatOld,
    onChooseWords,
    onContinue,
    onTest,
}) => {
    const { t } = useTranslation();
    const [limit, setLimit] = useState(-1);

    const getLimitedAmount = (words: WordDto[]) => {
        return limit === -1 ? words.length : Math.min(limit, words.length);
    };

    return (
        <div className="mt-2 text-gray-800 dark:text-gray-200 text-sm">
            <LimitSelector limit={limit} setLimit={setLimit} isDark={isDark} />

            <div className="flex flex-col md:flex-row items-center gap-2 mt-2">
                {onContinue && (
                    <button
                        onClick={onContinue}
                        className={`flex items-center gap-1 px-2 py-1.5 text-sm rounded hover:brightness-110 transition ${
                            isDark
                                ? "bg-green-600 text-white"
                                : "bg-green-500 text-white"
                        }`}
                    >
                        <CirclePlay size={16} />
                        {t("flashcards.continue")}
                    </button>
                )}

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

                                onTest(
                                    availableWords.slice(
                                        0,
                                        getLimitedAmount(availableWords)
                                    )
                                );
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
                                onTest(
                                    repetitionWords.slice(
                                        0,
                                        getLimitedAmount(repetitionWords)
                                    )
                                )
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

                <span
                    className={`text-xs font-medium ${
                        isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                >
                    {t("common.or")}
                </span>

                <button
                    onClick={onChooseWords}
                    className={`px-2 py-1.5 text-sm rounded transition text-white 
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
