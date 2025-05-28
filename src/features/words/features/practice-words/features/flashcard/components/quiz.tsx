import { useState } from "react";
import type { WordDto } from "../../../../../dto/word.dto";

interface QuizProps {
    words: WordDto[];
    onFinish: (results: { correctCount: number; total: number }) => void;
}

type Step = "originToTranslation" | "translationToOrigin";

export function Quiz({ words, onFinish }: QuizProps) {
    const [index, setIndex] = useState(0);
    const [step, setStep] = useState<Step>("originToTranslation");
    const [answer, setAnswer] = useState("");
    const [correctCount, setCorrectCount] = useState(0);
    const [showResult, setShowResult] = useState(false);

    if (words.length === 0) return <div>No words for test</div>;

    const word = words[index];

    function checkAnswer() {
        const correctAnswer =
            step === "originToTranslation" ? word.translation : word.origin;

        if (
            answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
        ) {
            setCorrectCount((c) => c + 1);
        }

        setAnswer("");

        if (step === "originToTranslation") {
            setStep("translationToOrigin");
        } else {
            if (index + 1 < words.length) {
                setIndex(index + 1);
                setStep("originToTranslation");
            } else {
                setShowResult(true);
            }
        }
    }

    if (showResult) {
        return (
            <div>
                <h2>Test finished!</h2>
                <p>
                    Correct answers: {correctCount} / {words.length * 2}
                </p>
                <button
                    onClick={() =>
                        onFinish({ correctCount, total: words.length * 2 })
                    }
                >
                    Close
                </button>
            </div>
        );
    }

    return (
        <div>
            <h3>
                Question {index * 2 + (step === "originToTranslation" ? 1 : 2)}{" "}
                / {words.length * 2}
            </h3>
            <div>
                Write the{" "}
                {step === "originToTranslation"
                    ? "translation for"
                    : "origin word for"}{" "}
                <strong>
                    {step === "originToTranslation"
                        ? word.origin
                        : word.translation}
                </strong>
            </div>
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                autoFocus
            />
            <button onClick={checkAnswer}>Submit</button>
        </div>
    );
}
