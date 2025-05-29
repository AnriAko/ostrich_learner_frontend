// src/pages/learn/components/select-specific-words.tsx
import { useState } from "react";
import type { WordDto } from "../../../../../dto/word.dto";

interface Props {
    words: WordDto[];
    selected: string[];
    setSelected: (words: string[]) => void;
    onStart: () => void;
    onCancel: () => void;
}

export function SelectSpecificWords({
    words,
    selected,
    setSelected,
    onStart,
    onCancel,
}: Props) {
    const [localSelected, setLocalSelected] = useState<string[]>(selected);

    const toggleWord = (origin: string) => {
        setLocalSelected((prev) =>
            prev.includes(origin)
                ? prev.filter((w) => w !== origin)
                : prev.length < 50
                ? [...prev, origin]
                : prev
        );
    };

    const selectAll = () => {
        const allOrigins = words.map((w) => w.origin).slice(0, 50);
        setLocalSelected(allOrigins);
    };

    const isSelected = (origin: string) => localSelected.includes(origin);

    const confirmSelection = () => {
        setSelected(localSelected);
        onStart();
    };

    return (
        <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-center">
                Select up to 50 words
            </h2>

            <div className="flex justify-between">
                <button
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                    onClick={selectAll}
                >
                    Select First 50
                </button>

                <button
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                    onClick={confirmSelection}
                    disabled={localSelected.length === 0}
                >
                    Start
                </button>
            </div>

            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto border p-2 rounded shadow">
                {words.map((word) => (
                    <li
                        key={word.origin}
                        onClick={() => toggleWord(word.origin)}
                        className={`cursor-pointer border rounded px-2 py-1 ${
                            isSelected(word.origin)
                                ? "bg-blue-600 text-white"
                                : "bg-white hover:bg-gray-100"
                        }`}
                    >
                        {word.origin} — {word.translation}
                    </li>
                ))}
            </ul>

            <div className="text-sm text-center text-gray-600">
                Selected: {localSelected.length} / 50
            </div>
        </div>
    );
}
