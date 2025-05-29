import { useState, useEffect } from "react";
import { useGetAvailableForLearning } from "../../../../../hooks/use-word";
import { useUser } from "../../../../../../../shared/context/user-context/use-user";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../../../user-config/types/theme";

interface SelectWordsAmountProps {
    onChange: (count: number) => void;
    initialCount?: number;
}

export function SelectWordsAmount({
    onChange,
    initialCount = 20,
}: SelectWordsAmountProps) {
    const { user } = useUser();
    const userId = user?.userId ?? "";

    const {
        data: flashcards,
        isLoading,
        isError,
        error,
    } = useGetAvailableForLearning(userId);

    const [selectedCount, setSelectedCount] = useState(initialCount);
    const maxCount = flashcards?.length || 0;

    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const containerBg = isDark ? "bg-gray-900" : "bg-gray-200";
    const titleColor = isDark ? "text-yellow-300" : "text-blue-600";
    const boxBg = isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-black";
    const labelClass = isDark ? "text-yellow-200" : "text-gray-700";
    const inputRangeClass = isDark ? "accent-yellow-400" : "accent-blue-600";

    const inputBaseClasses =
        "w-24 p-2 border rounded focus:outline-none focus:ring-0";
    const inputNumberClasses = isDark
        ? `${inputBaseClasses} bg-gray-800 text-gray-300 border-gray-700`
        : `${inputBaseClasses} bg-gray-50 text-gray-800 border-gray-300`;

    useEffect(() => {
        if (!isLoading && selectedCount > maxCount) {
            setSelectedCount(maxCount);
        }
    }, [isLoading, maxCount, selectedCount]);

    useEffect(() => {
        onChange(selectedCount);
    }, [selectedCount, onChange]);

    if (!user)
        return <div>{t("selectWords.loadingUser", "Loading user...")}</div>;
    if (isLoading)
        return (
            <div>
                {t("selectWords.loadingWords", "Loading available words...")}
            </div>
        );
    if (isError)
        return (
            <div>
                {t("selectWords.error", "Error loading words")}:{" "}
                {error?.message}
            </div>
        );

    return (
        <div className={`p-6 w-xl rounded ${containerBg}`}>
            <h2 className={`text-lg font-semibold mb-4 ${titleColor}`}>
                {t("selectWords.available", "Available words")}: {maxCount}
            </h2>

            <div className={`p-4 rounded space-y-4 ${boxBg}`}>
                <div className="flex items-center justify-between gap-4">
                    <label
                        htmlFor="wordsRange"
                        className={`font-medium ${labelClass}`}
                    >
                        {t(
                            "selectWords.selectAmount",
                            "Select how many words to learn:"
                        )}
                    </label>
                    <input
                        type="number"
                        min={1}
                        max={maxCount}
                        value={selectedCount}
                        onChange={(e) =>
                            setSelectedCount(Number(e.target.value))
                        }
                        className={inputNumberClasses}
                    />
                </div>

                <input
                    id="wordsRange"
                    type="range"
                    min={1}
                    max={maxCount}
                    value={selectedCount}
                    onChange={(e) => setSelectedCount(Number(e.target.value))}
                    className={`w-full ${inputRangeClass}`}
                />
            </div>
        </div>
    );
}
