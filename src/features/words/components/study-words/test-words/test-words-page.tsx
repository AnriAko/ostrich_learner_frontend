import { useTranslation } from "react-i18next";
import { useState } from "react";
import { WordDto } from "../../../dto/word.dto";
import { TestPhase, useWordTest } from "./hooks/use-test-words";
import ProgressBar from "./progress-bar";
import WordCard from "./word-card";
import AnswerInput from "./answer-input";
import ResultMessage from "./result-message";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";

interface TestWordsPageProps {
    words: WordDto[];
    onClose: () => void;
}

export default function TestWordsPage({ words, onClose }: TestWordsPageProps) {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const {
        phase,
        currentCard,
        showResult,
        checkAnswer,
        continueTest,
        correctAnswers,
        total,
        errors,
        originLang,
        targetLang,
        isLastCardCorrect,
    } = useWordTest(words);

    const [userAnswer, setUserAnswer] = useState("");

    const handleCheckAnswer = () => {
        if (!userAnswer.trim()) return;
        checkAnswer(userAnswer);
    };

    const handleContinue = () => {
        continueTest();
        setUserAnswer("");
    };

    if (!currentCard && phase === TestPhase.Completed) {
        return (
            <div className="p-6 text-center">
                <h2
                    className={`text-2xl font-bold mb-4 ${
                        isDark ? "text-green-400" : "text-green-600"
                    }`}
                >
                    🎉 {t("tests.All words completed!")}
                </h2>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {t("tests.Finish Test")}
                </button>
            </div>
        );
    }

    return (
        <div
            className={`p-4 max-w-sm mx-auto transition-colors duration-300 ${
                isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
            }`}
        >
            <div className="relative mb-4 h-10 flex items-center">
                <button
                    onClick={onClose}
                    className={`px-4 py-2 rounded  transition ${
                        isDark
                            ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    style={{ flexShrink: 0 }}
                >
                    ←
                </button>
                <h2
                    className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold"
                    style={{ pointerEvents: "none" }}
                >
                    {t("tests.Testing")}
                </h2>
            </div>

            <ProgressBar
                correct={correctAnswers}
                errors={errors.length}
                total={total}
            />

            {currentCard && (
                <>
                    <WordCard
                        word={currentCard.origin}
                        originLang={originLang}
                    />

                    <AnswerInput
                        userAnswer={userAnswer}
                        setUserAnswer={setUserAnswer}
                        onCheck={handleCheckAnswer}
                        onContinue={handleContinue}
                        showResult={showResult}
                        targetLang={targetLang}
                    />

                    <ResultMessage
                        showResult={showResult}
                        isCorrect={currentCard.isCorrect}
                        correctAnswer={currentCard.translation}
                    />
                </>
            )}

            <button
                onClick={
                    showResult
                        ? isLastCardCorrect
                            ? onClose
                            : handleContinue
                        : handleCheckAnswer
                }
                className={`w-full px-4 py-2 rounded transition-colors duration-300 ${
                    showResult
                        ? isLastCardCorrect
                            ? "bg-green-700 hover:bg-green-800"
                            : "bg-blue-600 hover:bg-blue-700"
                        : "bg-green-600 hover:bg-green-700"
                } text-white`}
            >
                {showResult
                    ? isLastCardCorrect
                        ? t("tests.Finish")
                        : t("tests.Continue")
                    : t("tests.Check")}
            </button>
        </div>
    );
}
