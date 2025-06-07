import { useTranslation } from "react-i18next";
import { Language, SupportedLanguages } from "../../../types/language";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";
import { useEffect, useRef, useState } from "react";

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

    const [isSourceOpen, setIsSourceOpen] = useState(false);
    const [isTargetOpen, setIsTargetOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const toggleSourceDropdown = () => setIsSourceOpen(!isSourceOpen);
    const toggleTargetDropdown = () => setIsTargetOpen(!isTargetOpen);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsSourceOpen(false);
                setIsTargetOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onSelectSourceLang = (lang: Language) => {
        if (lang === targetLang) {
            setSourceLang(targetLang);
            setTargetLang(sourceLang);
        } else {
            setSourceLang(lang);
        }
        setIsSourceOpen(false);
    };

    const onSelectTargetLang = (lang: Language) => {
        if (lang === sourceLang) {
            setSourceLang(targetLang);
            setTargetLang(sourceLang);
        } else {
            setTargetLang(lang);
        }
        setIsTargetOpen(false);
    };

    const selectWrapperClass = "relative w-40 text-[11.5px]";

    const selectDisplayClass =
        "h-[42px] flex items-center justify-between px-2 rounded border cursor-pointer select-none " +
        (isDark
            ? "bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700 active:bg-gray-600"
            : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 active:bg-gray-200");

    const dropdownClass =
        "absolute top-full left-0 w-full z-10 mt-1 rounded border overflow-hidden shadow " +
        (isDark
            ? "bg-gray-800 text-gray-300 border border-gray-600"
            : "bg-white text-gray-800 border border-gray-300");

    const optionClass =
        "px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer";

    return (
        <div className="flex justify-between gap-2" ref={containerRef}>
            <div className={selectWrapperClass}>
                <div
                    onClick={toggleSourceDropdown}
                    className={selectDisplayClass}
                >
                    {t(`languages.${sourceLang}`)}
                    <span className="ml-2">▼</span>
                </div>
                {isSourceOpen && (
                    <div className={dropdownClass}>
                        {SupportedLanguages.map(({ id }) => (
                            <div
                                key={id}
                                className={optionClass}
                                onClick={() => onSelectSourceLang(id)}
                            >
                                {t(`languages.${id}`)}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <button
                    type="button"
                    onClick={() => {
                        setSourceLang(targetLang);
                        setTargetLang(sourceLang);
                    }}
                    className={
                        "w-20 h-[42px] rounded border flex items-center justify-center cursor-pointer " +
                        (isDark
                            ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 active:bg-gray-600"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 active:bg-gray-200")
                    }
                    aria-label={t(
                        "addWordsPage.swapLanguages",
                        "Swap languages"
                    )}
                >
                    ⇄
                </button>
            </div>

            <div className={selectWrapperClass}>
                <div
                    onClick={toggleTargetDropdown}
                    className={selectDisplayClass}
                >
                    {t(`languages.${targetLang}`)}
                    <span className="ml-2">▼</span>
                </div>
                {isTargetOpen && (
                    <div className={dropdownClass}>
                        {SupportedLanguages.map(({ id }) => (
                            <div
                                key={id}
                                className={optionClass}
                                onClick={() => onSelectTargetLang(id)}
                            >
                                {t(`languages.${id}`)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
