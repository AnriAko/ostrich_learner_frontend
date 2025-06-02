// TestWordsPage.tsx
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { WordDto } from "../../../dto/word.dto";
import { TestPhase, useWordTest } from "./hooks/use-test-words";

interface TestWordsPageProps {
    words: WordDto[];
    onClose: () => void;
}

export default function TestWordsPage({ words, onClose }: TestWordsPageProps) {
    const { t } = useTranslation();
    const {
        phase,
        currentCard,
        showResult,
        checkAnswer,
        continueTest,
        correctAnswers,
        total,
    } = useWordTest(words);

    const [userAnswer, setUserAnswer] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Фокус при загрузке и после continue
    useEffect(() => {
        inputRef.current?.focus();
    }, [currentCard]);

    const handleCheckAnswer = () => {
        if (!userAnswer.trim()) return;
        checkAnswer(userAnswer);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (showResult) {
                handleContinue();
            } else {
                handleCheckAnswer();
            }
        }
    };

    const handleContinue = () => {
        continueTest();
        setUserAnswer("");
    };

    if (phase === TestPhase.Completed || !currentCard) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                    🎉 {t("All words completed!")}
                </h2>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {t("Close")}
                </button>
            </div>
        );
    }

    const progressWidth = (correctAnswers / total) * 100;

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">
                {t("Test phase")}: {t("Testing")}
            </h2>

            <div className="mb-4">
                <div className="flex justify-between text-sm font-medium mb-1">
                    <span>{t("Progress")}</span>
                    <span>
                        {correctAnswers}/{total}
                    </span>
                </div>
                <div className="w-full bg-gray-300 rounded h-3 overflow-hidden">
                    <div
                        className="bg-green-500 h-full transition-all"
                        style={{ width: `${progressWidth}%` }}
                    ></div>
                </div>
            </div>

            <div className="border p-4 rounded mb-4 bg-gray-100">
                <p className="text-lg font-semibold">{currentCard.origin}</p>
            </div>

            <div className="flex gap-2 mb-2">
                <input
                    type="text"
                    ref={inputRef}
                    className={`flex-1 border px-2 py-1 rounded ${
                        showResult ? "bg-gray-200" : ""
                    }`}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder={t("Type your answer...")}
                    onKeyDown={handleKeyDown}
                    disabled={showResult}
                />
            </div>

            <div className="h-6 mb-4 text-sm font-semibold">
                {showResult && (
                    <span
                        className={
                            currentCard.isCorrect
                                ? "text-green-600"
                                : "text-red-600"
                        }
                    >
                        {currentCard.isCorrect
                            ? t("Correct!")
                            : `${t("Incorrect!")} (${t("Correct answer")}: ${
                                  currentCard.translation
                              })`}
                    </span>
                )}
            </div>

            <button
                onClick={showResult ? handleContinue : handleCheckAnswer}
                className={`w-full px-4 py-2 rounded ${
                    showResult
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-green-600 hover:bg-green-700"
                } text-white`}
            >
                {showResult ? t("Continue") : t("Check")}
            </button>
        </div>
    );
}
