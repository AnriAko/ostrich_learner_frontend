import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LIMIT_STORAGE_KEY = "flashcard-limit";

interface LimitSelectorProps {
    limit: number;
    setLimit: (limit: number) => void;
    isDark: boolean;
}

export const LimitSelector: React.FC<LimitSelectorProps> = ({
    setLimit,
    isDark,
}) => {
    const { t } = useTranslation();

    const getInitialLimit = () => {
        const storedLimit = localStorage.getItem(LIMIT_STORAGE_KEY);
        if (storedLimit !== null) {
            const parsed = Number(storedLimit);
            if (!isNaN(parsed)) {
                return parsed;
            }
        }
        return -1;
    };

    const [internalLimit, setInternalLimit] = useState<number>(getInitialLimit);

    React.useEffect(() => {
        setLimit(internalLimit);
    }, [internalLimit, setLimit]);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value);
        setInternalLimit(value);
        setLimit(value);
        localStorage.setItem(LIMIT_STORAGE_KEY, value.toString());
    };

    const options = [
        { value: 5, label: "5" },
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 30, label: "30" },
        { value: 50, label: "50" },
        { value: -1, label: t("flashcards.all") },
    ];

    return (
        <div className="mb-4">
            <label
                className={`mr-2 ${isDark ? "text-gray-200" : "text-gray-800"}`}
            >
                {t("flashcards.selectNumberOfWords")}:
            </label>
            <select
                value={internalLimit}
                onChange={onChange}
                className={`px-2 py-1 border rounded ${
                    isDark
                        ? "bg-gray-800 text-white border-gray-600"
                        : "bg-white text-black border-gray-300"
                }`}
            >
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};
