// src/features/add-words/components/add-word-form.tsx
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../../add-word/language-selector";
import { WordInputs } from "../../add-word/word-inputs";
import { useAddWordLogic } from "../../hooks/use-add-word-logic";
import { useTheme } from "../../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../../user-config/types/theme";

export const AddWordForm = () => {
    const { t } = useTranslation();
    const {
        handleSubmit,
        isLoading,
        word,
        translate,
        setWord,
        setTranslate,
        sourceLang,
        targetLang,
        setSourceLang,
        setTargetLang,
    } = useAddWordLogic();

    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const bgClass = isDark ? "bg-gray-900" : "bg-gray-200";
    const textClass = isDark ? "text-yellow-300" : "text-blue-600";
    const formBgClass = isDark
        ? "bg-gray-800 text-white"
        : "bg-gray-100 text-black";
    const buttonBgClass = isDark
        ? "bg-yellow-600 hover:bg-yellow-700"
        : "bg-blue-600 hover:bg-blue-700";
    const buttonTextClass = "text-white";

    return (
        <div className={`p-6 w-xl ${bgClass}`}>
            <h1 className={`text-xl font-bold mb-4 ${textClass}`}>
                {t("addWordsPage.title", "Add a new word")}
            </h1>

            <form
                onSubmit={handleSubmit}
                className={`space-y-6 p-4 rounded ${formBgClass}`}
            >
                <LanguageSelector
                    sourceLang={sourceLang}
                    targetLang={targetLang}
                    setSourceLang={setSourceLang}
                    setTargetLang={setTargetLang}
                />
                <WordInputs
                    word={word}
                    translate={translate}
                    onWordChange={(e) => setWord(e.target.value)}
                    onTranslateChange={(e) => setTranslate(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 px-4 rounded disabled:opacity-50 ${buttonBgClass} ${buttonTextClass}`}
                >
                    {t("addWordsPage.submit", "Add word")}
                </button>
            </form>
        </div>
    );
};
