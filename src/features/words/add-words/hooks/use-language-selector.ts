// hooks/use-language-selector.ts
import { useState } from "react";
import { Language, SupportedLanguages } from "../../types/language";

const languageMap: Record<string, Language> = {
    english: Language.English,
    russian: Language.Russian,
    georgian: Language.Georgian,
};

export const useLanguageSelector = () => {
    const defaultSourceLang = Language.Georgian;
    const defaultTargetLang =
        SupportedLanguages.find(
            ({ id }) => languageMap[id] !== defaultSourceLang
        )?.id ?? "english";

    const [sourceLang, setSourceLang] = useState<Language>(defaultSourceLang);
    const [targetLang, setTargetLang] = useState<Language>(
        languageMap[defaultTargetLang]
    );

    const handleSourceLangChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedId = e.target.value;
        const tempSource = languageMap[selectedId];
        if (!tempSource) return;
        if (tempSource === targetLang) {
            // swap if equal
            const tempTarget = sourceLang;
            setSourceLang(tempSource);
            setTargetLang(tempTarget);
        } else {
            setSourceLang(tempSource);
        }
    };

    const handleTargetLangChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedId = e.target.value;
        const tempTarget = languageMap[selectedId];
        if (!tempTarget) return;
        if (tempTarget === sourceLang) {
            // swap if equal
            const tempSource = targetLang;
            setTargetLang(tempTarget);
            setSourceLang(tempSource);
        } else {
            setTargetLang(tempTarget);
        }
    };

    const handleSwapLanguages = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
    };

    return {
        sourceLang,
        targetLang,
        handleSourceLangChange,
        handleTargetLangChange,
        handleSwapLanguages,
    };
};
