import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { useTranslation } from "react-i18next";
import { CirclePlay } from "lucide-react";

interface Props {
    onCheck: (value: string) => void;
}

export default function TestWordInput({ onCheck }: Props) {
    const { t } = useTranslation();
    const { theme } = useTheme();

    const inputClass =
        theme === "dark"
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-black border-gray-300";

    const handleSubmit = () => {
        const value = (document.activeElement as HTMLInputElement)?.value || "";
        onCheck(value);
    };

    return (
        <>
            <input
                type="text"
                placeholder={t("Enter translation")}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onCheck(e.currentTarget.value);
                }}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 ${inputClass}`}
            />
            <button
                className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSubmit}
            >
                <CirclePlay className="mr-2 h-4 w-4" /> {t("Check")}
            </button>
        </>
    );
}
