import { useState } from "react";
import { useFlashcardsManager } from "../hooks/useFlashcardsManager";
import { Flashcards } from "./flashcards";
import { Quiz } from "./quiz";
import { SelectWordsAmount } from "./select-words-amount";
import { SelectSpecificWords } from "./select-specific-words";
import { BookOpenCheck, ListChecks } from "lucide-react";
import { useGetAvailableForLearning } from "../../../../../hooks/use-word";
import { useUser } from "../../../../../../../shared/context/user-context/use-user";

type Mode = "menu" | "selectAmount" | "selectSpecific" | "started" | "testing";

export function TestPage() {
    const [mode, setMode] = useState<Mode>("menu");
    const [count, setCount] = useState(10);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [directTest, setDirectTest] = useState(false);
    const { user } = useUser();

    const { data: allWords = [] } = useGetAvailableForLearning(user!.userId);

    const { flashcards, loading } = useFlashcardsManager(
        selectedWords.length > 0 ? selectedWords.length : count,
        selectedWords.length > 0 ? selectedWords : undefined
    );

    const startFlashcards = () => {
        setMode("started");
        setDirectTest(false);
    };

    const startDirectTest = () => {
        setMode("started");
        setDirectTest(true);
    };

    const finishFlashcards = () => {
        setMode("testing");
    };

    const finishTest = (results: { correctCount: number; total: number }) => {
        alert(
            `Test finished! Correct answers: ${results.correctCount} / ${results.total}`
        );
        setMode("menu");
        setSelectedWords([]);
        setDirectTest(false);
    };

    if (mode === "menu") {
        return (
            <div className="flex flex-col items-center gap-4 max-w-xl">
                <button
                    onClick={() => setMode("selectAmount")}
                    className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                    <BookOpenCheck size={24} stroke="white" />
                    Select amount of words
                </button>

                <button
                    onClick={() => setMode("selectSpecific")}
                    className="flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                    <ListChecks size={24} stroke="white" />
                    Choose specific words
                </button>
            </div>
        );
    }

    if (mode === "selectAmount") {
        return (
            <div className="flex flex-col items-center gap-4 max-w-xl">
                <SelectWordsAmount onChange={setCount} initialCount={count} />

                <div className="flex gap-4">
                    <button
                        onClick={startFlashcards}
                        disabled={count < 1 || loading}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Learn with flashcards
                    </button>

                    <button
                        onClick={startDirectTest}
                        disabled={count < 1 || loading}
                        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                    >
                        Test immediately
                    </button>
                </div>
            </div>
        );
    }

    if (mode === "selectSpecific") {
        return (
            <SelectSpecificWords
                words={allWords}
                selected={selectedWords}
                setSelected={setSelectedWords}
                onStart={() => setMode("started")}
                onCancel={() => {
                    setSelectedWords([]);
                    setMode("menu");
                }}
            />
        );
    }

    if (mode === "started" && !directTest) {
        return <Flashcards words={flashcards} onFinish={finishFlashcards} />;
    }

    if (mode === "testing" || (mode === "started" && directTest)) {
        return <Quiz words={flashcards} onFinish={finishTest} />;
    }

    return null;
}
