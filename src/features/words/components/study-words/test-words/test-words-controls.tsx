import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { useTranslation } from "react-i18next";
import { RotateCcw, SkipForward } from "lucide-react";

interface Props {
    reshuffle: () => void;
    skip: () => void;
}

export default function TestWordControls({ reshuffle, skip }: Props) {
    const { t } = useTranslation();
    const { theme } = useTheme();

    const btnTextClass =
        theme === "dark"
            ? "text-gray-300 hover:text-white"
            : "text-gray-600 hover:text-black";

    return (
        <div className="flex justify-between items-center">
            <button
                onClick={reshuffle}
                className={`flex items-center ${btnTextClass}`}
            >
                <RotateCcw className="mr-2 h-4 w-4" /> {t("Reshuffle")}
            </button>
            <button
                onClick={skip}
                className={`flex items-center ${btnTextClass}`}
            >
                <SkipForward className="mr-2 h-4 w-4" /> {t("Skip")}
            </button>
        </div>
    );
}
