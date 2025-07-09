import React from "react";
import { Language, SupportedLanguages } from "../../../../words/types/language";

interface LanguageSelectorProps {
    sourceLang: Language;
    targetLang: Language;
    setSourceLang: (lang: Language) => void;
    setTargetLang: (lang: Language) => void;
    swapLanguages: () => void;
    inputClass: string;
    labelClass: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    sourceLang,
    targetLang,
    setSourceLang,
    setTargetLang,
    swapLanguages,
    inputClass,
    labelClass,
}) => (
    <div className="flex items-center justify-between gap-2">
        <span className={labelClass}>From:</span>
        <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value as Language)}
            className={`p-1 rounded border text-sm ${inputClass}`}
        >
            {SupportedLanguages.map(({ id }) => (
                <option key={id} value={id}>
                    {id}
                </option>
            ))}
        </select>

        <button
            type="button"
            onClick={swapLanguages}
            className={`px-2 py-1 rounded border text-sm ${inputClass}`}
        >
            ⇄
        </button>

        <span className={labelClass}>To:</span>
        <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value as Language)}
            className={`p-1 rounded border text-sm ${inputClass}`}
        >
            {SupportedLanguages.map(({ id }) => (
                <option key={id} value={id}>
                    {id}
                </option>
            ))}
        </select>
    </div>
);
