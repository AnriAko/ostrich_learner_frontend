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
    <form
        onSubmit={handleAdd}
        className="flex flex-col gap-2 text-xs w-[200px] self-start"
    >
        <div className="flex flex-col gap-1 w-full">
            <label className={labelClass}>Word</label>
            <input
                type="text"
                value={originState}
                onChange={(e) => setOrigin(e.target.value)}
                required
                className={`w-full py-1 px-2 rounded border text-xs 
        outline-none ring-0 focus:outline-none 
        focus:ring-0 focus:border-gray-500 focus:shadow-none 
        ${inputClass}`}
            />
        </div>

        <div className="flex flex-col gap-1 w-full">
            <label className={labelClass}>Translation</label>
            <input
                ref={translationInputRef}
                type="text"
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                required
                className={`w-full py-1 px-2 rounded border text-xs 
        outline-none ring-0 focus:outline-none 
        focus:ring-0 focus:border-gray-500 focus:shadow-none 
        ${inputClass}`}
            />
        </div>

        <button
            type="submit"
            className={`py-1 px-2 rounded text-xs font-semibold w-full ${
                isDark
                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
            Add
        </button>
    </form>
);
