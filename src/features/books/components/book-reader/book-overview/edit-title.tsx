import React, { useState, useRef, useEffect } from "react";
import { Check, X } from "lucide-react";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { toast } from "react-toastify";

interface EditTitleProps {
    initialValue: string;
    onCancel: () => void;
    onConfirm: (newTitle: string) => void;
}

export const EditTitle: React.FC<EditTitleProps> = ({
    initialValue,
    onCancel,
    onConfirm,
}) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [editValue, setEditValue] = useState(initialValue);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            const len = inputRef.current.value.length;
            inputRef.current.setSelectionRange(len, len);
        }
    }, []);

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Escape") {
            e.preventDefault();
            onCancel();
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (editValue.trim()) {
                onConfirm(editValue.trim());
            } else {
                toast.error("Title cannot be empty");
            }
        }
    };

    return (
        <div className="flex flex-col flex-grow">
            <textarea
                ref={inputRef}
                className={`resize-none w-full font-semibold border-2
          ${
              isDark
                  ? "bg-gray-800 text-gray-300 border-gray-700"
                  : "bg-white text-gray-700 border-gray-300"
          }`}
                rows={2}
                style={{ margin: 0, padding: 0, borderRadius: 0 }}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={onKeyDown}
            />
            <div className="flex space-x-1 mt-1">
                <button
                    onClick={() => {
                        if (editValue.trim()) {
                            onConfirm(editValue.trim());
                        } else {
                            toast.error("Title cannot be empty");
                        }
                    }}
                    className="p-1 rounded bg-green-600 hover:bg-green-700 text-white"
                    aria-label="Confirm edit"
                    style={{ lineHeight: 1 }}
                >
                    <Check size={16} />
                </button>
                <button
                    onClick={onCancel}
                    className="p-1 rounded bg-red-600 hover:bg-red-700 text-white"
                    aria-label="Cancel edit"
                    style={{ lineHeight: 1 }}
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};
