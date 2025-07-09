import React from "react";

interface TranslationFormProps {
    originState: string;
    setOrigin: React.Dispatch<React.SetStateAction<string>>;
    translation: string;
    setTranslation: React.Dispatch<React.SetStateAction<string>>;
    labelClass: string;
    inputClass: string;
    translationInputRef: React.RefObject<HTMLInputElement>;
    handleAdd: (e: React.FormEvent) => void;
    isDark: boolean;
}

export const TranslationForm: React.FC<TranslationFormProps> = ({
    originState,
    setOrigin,
    translation,
    setTranslation,
    labelClass,
    inputClass,
    translationInputRef,
    handleAdd,
    isDark,
}) => (
    <form onSubmit={handleAdd} className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col gap-2">
            <label className={labelClass}>Word</label>
            <input
                type="text"
                value={originState}
                onChange={(e) => setOrigin(e.target.value)}
                required
                className={`w-full p-2 rounded border ${inputClass}`}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label className={labelClass}>Translation</label>
            <input
                ref={translationInputRef}
                type="text"
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                required
                className={`w-full p-2 rounded border ${inputClass}`}
            />
        </div>

        <button
            type="submit"
            className={`py-1.5 px-2 rounded text-sm font-semibold ${
                isDark
                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
            Add
        </button>
    </form>
);
