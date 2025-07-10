import React from "react";
import { useTranslation } from "react-i18next";

interface TranslationContextMenuProps {
    posX: number;
    posY: number;
    isDark: boolean;
    onRemove: () => void;
    onClose: () => void;
}

export const TranslationContextMenu: React.FC<TranslationContextMenuProps> = ({
    posX,
    posY,
    isDark,
    onRemove,
    onClose,
}) => {
    const { t } = useTranslation();

    React.useEffect(() => {
        const handleClickOutside = () => {
            onClose();
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            style={{
                position: "fixed",
                top: posY,
                left: posX,
                backgroundColor: isDark ? "#333" : "#fff",
                border: `1px solid ${isDark ? "#555" : "#ccc"}`,
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                borderRadius: 4,
                zIndex: 1000,
                padding: "8px",
            }}
        >
            <button
                onClick={() => {
                    onRemove();
                    onClose();
                }}
                style={{
                    color: "white",
                    backgroundColor: "#e3342f",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 3,
                    cursor: "pointer",
                    fontWeight: "bold",
                }}
            >
                {t("bookOverview.removeTranslation") || "Удалить перевод"}
            </button>
        </div>
    );
};
