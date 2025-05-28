import { useEffect, useState } from "react";
import { Word } from "./types";

interface Props {
    word: Word | null;
    onSave: (word: Word) => void;
    onClose: () => void;
}

export const EditWordModal = ({ word, onSave, onClose }: Props) => {
    const [edited, setEdited] = useState<Word | null>(word);

    useEffect(() => {
        setEdited(word);
    }, [word]);

    if (!word) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (edited) setEdited({ ...edited, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow w-96">
                <h2 className="text-lg mb-2">Edit Word</h2>
                <input
                    name="sourceWord"
                    value={edited?.sourceWord || ""}
                    onChange={handleChange}
                    className="w-full mb-2"
                />
                <input
                    name="targetWord"
                    value={edited?.targetWord || ""}
                    onChange={handleChange}
                    className="w-full mb-2"
                />
                <button onClick={() => edited && onSave(edited)}>Save</button>
                <button onClick={onClose} className="ml-2 text-gray-600">
                    Cancel
                </button>
            </div>
        </div>
    );
};
