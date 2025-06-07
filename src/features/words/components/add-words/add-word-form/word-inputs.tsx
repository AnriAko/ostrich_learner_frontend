import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";
import { forwardRef } from "react";

interface WordInputsProps {
    word: string;
    translate: string;
    onWordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTranslateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const WordInputs = forwardRef<HTMLInputElement, WordInputsProps>(
    ({ word, translate, onWordChange, onTranslateChange }, ref) => {
        const { t } = useTranslation();
        const { theme } = useTheme();
        const isDark = theme === Theme.dark;

        const inputBaseClasses =
            "w-full p-2 border rounded focus:outline-none focus:ring-0 text-[12px]";
        const inputClasses = isDark
            ? `${inputBaseClasses} bg-gray-800 text-gray-300 border-gray-700`
            : `${inputBaseClasses} bg-gray-50 text-gray-800 border-gray-300`;

        const labelClasses = isDark
            ? "block mb-1 text-gray-300 text-[12px]"
            : "block mb-1 text-gray-800 text-[12px]";

        const handlePreventSelect = (e: React.FocusEvent<HTMLInputElement>) => {
            const input = e.currentTarget;
            const end = input.selectionEnd ?? 0;
            input.setSelectionRange(end, end);
        };

        return (
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClasses}>
                        {t("addWordsPage.original", "Original word")}
                    </label>
                    <input
                        ref={ref}
                        type="text"
                        value={word}
                        onChange={onWordChange}
                        onFocus={handlePreventSelect}
                        className={inputClasses}
                        required
                    />
                </div>
                <div>
                    <label className={labelClasses}>
                        {t("addWordsPage.translation", "Translation")}
                    </label>
                    <input
                        type="text"
                        value={translate}
                        onChange={onTranslateChange}
                        onFocus={handlePreventSelect}
                        className={inputClasses}
                        required
                    />
                </div>
            </div>
        );
    }
);
