import { useTranslation } from "react-i18next";
import { Language, SupportedLanguages } from "../../types/language";
import { useLanguageSelector } from "../hooks/use-language-selector";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../user-config/types/theme";

const reverseLanguageMap: Record<Language, string> = {
    [Language.English]: "english",
    [Language.Russian]: "russian",
    [Language.Georgian]: "georgian",
};

export const LanguageSelector = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const {
        sourceLang,
        targetLang,
        handleSourceLangChange,
        handleTargetLangChange,
        handleSwapLanguages,
    } = useLanguageSelector();

    const labelClass = isDark ? "text-gray-300" : "text-gray-800";
    const selectClass =
        "w-full p-2 border rounded " +
        (isDark
            ? "dark:bg-gray-800 dark:text-gray-300 border-gray-600"
            : "bg-white text-gray-800 border-gray-300");
    const buttonClass =
        "h-[42px] px-3 border rounded " +
        (isDark
            ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600"
            : "bg-white text-gray-800 hover:bg-gray-100 border-gray-300");

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
                <label className={`mb-1 ${labelClass}`}>
                    {t("addWordsPage.fromLanguage", "Original language")}
                </label>
                <select
                    value={reverseLanguageMap[sourceLang]}
                    onChange={handleSourceLangChange}
                    className={selectClass}
                >
                    {SupportedLanguages.map(({ id }) => (
                        <option key={id} value={id}>
                            {t(`languages.${id}`)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col items-center justify-end">
                <label className="mb-1 invisible">Swap</label>
                <button
                    type="button"
                    onClick={handleSwapLanguages}
                    className={buttonClass}
                    aria-label={t(
                        "addWordsPage.swapLanguages",
                        "Swap languages"
                    )}
                >
                    ⇄
                </button>
            </div>

            <div className="flex flex-col">
                <label className={`mb-1 ${labelClass}`}>
                    {t("addWordsPage.toLanguage", "Translation language")}
                </label>
                <select
                    value={reverseLanguageMap[targetLang]}
                    onChange={handleTargetLangChange}
                    className={selectClass}
                >
                    {SupportedLanguages.map(({ id }) => (
                        <option key={id} value={id}>
                            {t(`languages.${id}`)}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
