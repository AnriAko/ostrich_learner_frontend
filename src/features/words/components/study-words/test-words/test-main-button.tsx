import { useTranslation } from "react-i18next";

interface TestMainButtonProps {
    isTestOver: boolean;
    showResult: boolean;
    isSoftMatch: boolean;
    isLastCardCorrect: boolean;
    onClose: () => void;
    onCheckAnswer: () => void;
    onContinue: () => void;
}

export default function TestMainButton({
    isTestOver,
    showResult,
    isSoftMatch,
    isLastCardCorrect,
    onClose,
    onCheckAnswer,
    onContinue,
}: TestMainButtonProps) {
    const { t } = useTranslation();

    const renderButtonText = () => {
        if (isTestOver) return t("tests.Finish");
        if (showResult && !isSoftMatch) {
            return isLastCardCorrect ? t("tests.Finish") : t("tests.Continue");
        }
        return t("tests.Check");
    };

    const handleClick = () => {
        if (isTestOver) {
            onClose();
        } else if (showResult && !isSoftMatch) {
            onContinue();
        } else {
            onCheckAnswer();
        }
    };

    const buttonColor = isTestOver
        ? "bg-green-700 hover:bg-green-800"
        : showResult && !isSoftMatch
        ? isLastCardCorrect
            ? "bg-green-700 hover:bg-green-800"
            : "bg-blue-600 hover:bg-blue-700"
        : "bg-green-600 hover:bg-green-700";

    return (
        <button
            onClick={handleClick}
            className={`w-full px-4 py-2 rounded transition-colors duration-300 ${buttonColor} text-white`}
        >
            {renderButtonText()}
        </button>
    );
}
