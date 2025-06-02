import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { useTranslation } from "react-i18next";

interface Props {
    index: number;
    total: number;
    correct: number;
    incorrect: number;
}

export default function TestWordProgress({
    index,
    total,
    correct,
    incorrect,
}: Props) {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const subTextClass = theme === "dark" ? "text-gray-400" : "text-gray-500";

    return (
        <div className={`text-sm text-center ${subTextClass}`}>
            {t("Progress")}: {index + 1}/{total} • ✅ {correct} • ❌ {incorrect}
        </div>
    );
}
