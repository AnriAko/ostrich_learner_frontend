import { useTranslation } from "react-i18next";
import { Language, SupportedLanguages } from "../../../types/language";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";

const reverseLanguageMap: Record<Language, string> = {
    [Language.English]: "english",
    [Language.Russian]: "russian",
    [Language.Georgian]: "georgian",
};

interface LanguageSelectorProps {
    sourceLang: Language;
    targetLang: Language;
    setSourceLang: (lang: Language) => void;
    setTargetLang: (lang: Language) => void;
}

export const LanguageSelector = ({
    sourceLang,
    targetLang,
    setSourceLang,
    setTargetLang,
}: LanguageSelectorProps) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const handleSourceLangChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSourceLang(e.target.value as Language);
    };

    const handleTargetLangChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setTargetLang(e.target.value as Language);
    };

    const handleSwapLanguages = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
    };

    const selectClass =
        "w-40 h-[42px] p-2 rounded focus:outline-none cursor-pointer " +
        (isDark
            ? "bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700 active:bg-gray-600"
            : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 active:bg-gray-200");

    const buttonClass =
        "w-20 h-[42px] rounded border flex items-center justify-center cursor-pointer " +
        (isDark
            ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 active:bg-gray-600"
            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 active:bg-gray-200");

    return (
        <div className="flex justify-between gap-2">
            <div>
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

            <div>
                <button
                    type="button"
                    onClick={handleSwapLanguages}
                    className={`${buttonClass} cursor-pointer`}
                    aria-label={t(
                        "addWordsPage.swapLanguages",
                        "Swap languages"
                    )}
                >
                    ⇄
                </button>
            </div>

            <div>
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
