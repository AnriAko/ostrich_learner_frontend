import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useCreateBookWithPdf } from "../../../hooks/use-book";
import { useUser } from "../../../../../shared/context/user-context/use-user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";

export const UploadBookButton: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const mutation = useCreateBookWithPdf();
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const toastIdRef = useRef<{
        success?: string | number;
        error?: string | number;
    }>({});

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user?.userId) {
            if (
                !toastIdRef.current.error ||
                !toast.isActive(toastIdRef.current.error)
            ) {
                toastIdRef.current.error = toast.error(
                    t("bookOverview.userIdNotFound")
                );
            }
            return;
        }

        setIsUploading(true);

        mutation.mutate(
            { pdfFile: file, userId: user.userId, fileName: file.name },
            {
                onSuccess: () => {
                    if (
                        !toastIdRef.current.success ||
                        !toast.isActive(toastIdRef.current.success)
                    ) {
                        toastIdRef.current.success = toast.success(
                            t("bookOverview.uploadSuccess")
                        );
                    }
                },
                onError: () => {
                    if (
                        !toastIdRef.current.error ||
                        !toast.isActive(toastIdRef.current.error)
                    ) {
                        toastIdRef.current.error = toast.error(
                            t("bookOverview.uploadFail")
                        );
                    }
                },
                onSettled: () => {
                    setIsUploading(false);
                    if (inputRef.current) {
                        inputRef.current.value = "";
                    }
                },
            }
        );
    };

    const baseButtonClass = isDark
        ? "bg-yellow-300 text-gray-800 hover:bg-yellow-200"
        : "bg-blue-500 text-white hover:bg-blue-600";

    const disabledClass = "cursor-not-allowed opacity-50";
    const enabledClass = "cursor-pointer";

    return (
        <div className="flex items-center gap-3 pb-2">
            <input
                id="upload-pdf"
                ref={inputRef}
                type="file"
                accept="application/pdf"
                onChange={onFileChange}
                className="hidden"
                disabled={isUploading}
            />
            <label
                htmlFor="upload-pdf"
                className={`${baseButtonClass} inline-flex items-center h-5 px-5 text-xs rounded leading-[20px] font-bold
    ${isUploading ? disabledClass : enabledClass}`}
                style={{ userSelect: "none" }}
            >
                {t("bookOverview.uploadBookPdf")}
            </label>

            {isUploading && (
                <div className="flex items-center gap-2 text-sm text-yellow-300 dark:text-blue-500 font-bold">
                    <svg
                        className="animate-spin h-4 w-4 text-yellow-300 dark:text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                    <span>{t("bookOverview.pleaseWaitUpload")}</span>
                    <span
                        className="ml-1 border border-current rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-help"
                        title={t("bookOverview.pleaseWaitUploadClue")}
                    >
                        ?
                    </span>
                </div>
            )}
        </div>
    );
};
