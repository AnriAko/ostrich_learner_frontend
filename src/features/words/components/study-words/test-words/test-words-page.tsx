import { useTranslation } from "react-i18next";
import { useState } from "react";
import { WordDto } from "../../../dto/word.dto";
import ProgressBar from "./progress-bar";
import WordCard from "./word-card";
import AnswerInput from "./answer-input";
import ResultMessage from "./result-message";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";
import { TestPhase } from "./hooks/test-hooks/types/test";
import { useNavigate } from "react-router-dom";
import { useTestWord } from "./hooks/test-hooks/use-test-words";
import TestMainButton from "./test-main-button";

interface TestWordsPageProps {
    words: WordDto[];
    limit: number;
}

export default function TestWordsPage({ words, limit }: TestWordsPageProps) {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;
    const navigate = useNavigate();

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
        isTestFinished,
        resetResult,
    } = useTestWord(words, limit);

    const onClose = () => navigate(-1);

    const [userAnswer, setUserAnswer] = useState("");

    const handleUserAnswerChange = (value: string) => {
        if (showResult) {
            resetResult();
        }
        setUserAnswer(value);
    };

    const isSoftMatch = currentCard?.isCorrect === "userHasThisTranslation";
    const isTestOver = isTestFinished || phase === TestPhase.Completed;

    const handleCheckAnswer = () => {
        if (!userAnswer.trim()) return;
        checkAnswer(userAnswer);
    };

    const handleContinue = () => {
        continueTest();
        setUserAnswer("");
    };

    const handleInputEnterPress = () => {
        if (isTestOver) {
            onClose();
            return;
        }

        if (showResult) {
            if (!isSoftMatch) {
                handleContinue();
            }
            return;
        }

        handleCheckAnswer();
    };

    const isInputDisabled = isTestOver || (showResult && !isSoftMatch);

    return (
        <div
            className={`p-4 min-w-sm transition-colors duration-300 ${
                isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
            }`}
        >
            <div className="relative mb-4 h-10 flex items-center">
                <button
                    onClick={onClose}
                    className={`px-4 py-2 rounded transition ${
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
                        setUserAnswer={handleUserAnswerChange}
                        onCheck={handleCheckAnswer}
                        onContinue={handleContinue}
                        showResult={showResult}
                        targetLang={targetLang}
                        disabled={isInputDisabled}
                        onEnterPress={handleInputEnterPress}
                    />

                    <ResultMessage
                        showResult={showResult}
                        isCorrect={currentCard.isCorrect}
                        correctAnswer={currentCard.translation}
                    />
                </>
            )}

            <TestMainButton
                isTestOver={isTestOver}
                showResult={showResult}
                isSoftMatch={isSoftMatch}
                isLastCardCorrect={isLastCardCorrect}
                onClose={onClose}
                onCheckAnswer={handleCheckAnswer}
                onContinue={handleContinue}
            />
        </div>
    );
}
