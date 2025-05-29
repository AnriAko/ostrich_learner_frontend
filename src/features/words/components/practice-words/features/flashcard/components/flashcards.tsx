import { useState } from "react";
import type { WordDto } from "../../../../../dto/word.dto";

interface FlashcardsProps {
    words: WordDto[];
    onFinish: () => void;
}

export function Flashcards({ words, onFinish }: FlashcardsProps) {
    const [index, setIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);

    if (words.length === 0) return <div>No words to learn</div>;

    const word = words[index];

    function nextCard() {
        setShowTranslation(false);
        setIndex((prev) => (prev + 1 < words.length ? prev + 1 : prev));
    }

    return (
        <div>
            <h3>
                Word {index + 1} / {words.length}
            </h3>
            <div
                style={{ fontSize: 32, cursor: "pointer", userSelect: "none" }}
                onClick={() => setShowTranslation(!showTranslation)}
            >
                {showTranslation ? word.translation : word.origin}
            </div>
            <button onClick={nextCard} disabled={index + 1 >= words.length}>
                Next
            </button>
            {index + 1 >= words.length && (
                <button onClick={onFinish} style={{ marginLeft: 10 }}>
                    Start Test
                </button>
            )}
        </div>
    );
}
