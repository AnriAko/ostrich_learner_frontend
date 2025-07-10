import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";
import { useUser } from "../../../../../shared/context/user-context/use-user";
import { Language } from "../../../../words/types/language";
import { useAddTranslation } from "../../../hooks/use-book-translation";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";

import { FontSizeControl } from "./font-size-control";
import { LanguageSelector } from "./language-selector";
import { TranslationForm } from "./translation-form";

interface BookSidePanelProps {
    fontSize: number;
    setFontSize: (size: number) => void;
    page: number;
    posId: number;
    origin: string;
}

export const BookSidePanel: React.FC<BookSidePanelProps> = ({
    fontSize,
    setFontSize,
    page,
    posId,
    origin,
}) => {
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;
    const labelClass = isDark ? "text-gray-300" : "text-gray-800";
    const inputClass = isDark
        ? "bg-gray-800 text-gray-100 border-gray-600"
        : "bg-white text-gray-800 border-gray-300";

    const { user } = useUser();
    const userId = user?.userId;
    const { bookId } = useParams<{ bookId: string }>();
    const { t } = useTranslation();

    const [originState, setOrigin] = useState("");
    const [translation, setTranslation] = useState("");
    const [sourceLang, setSourceLang] = useState<Language>(Language.English);
    const [targetLang, setTargetLang] = useState<Language>(Language.Georgian);

    const translationInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setOrigin(origin);
        setTranslation("");
        translationInputRef.current?.focus();
    }, [origin]);

    const addMutation = useAddTranslation();

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!originState.trim() || !translation.trim() || !userId || !bookId)
            return;

        const dto = {
            pageIndex: page,
            posId,
            createWordDto: {
                origin: originState,
                translation,
                sourceLang,
                targetLang,
                userId,
            },
        };

        console.log("[BookSidePanel] Submitting translation DTO:", {
            bookId,
            dto,
        });

        addMutation.mutate(
            { bookId: bookId!, dto },
            {
                onSuccess: () => {
                    toast.success(t("wordAdded", "Word successfully added!"), {
                        theme,
                        toastId: "word-added",
                    });
                    setOrigin("");
                    setTranslation("");
                    translationInputRef.current?.focus();
                },
                onError: (error: unknown) => {
                    const e = error as AxiosError<any>;
                    const raw =
                        (e?.response?.data?.message?.message as string) ||
                        (e?.message as string) ||
                        (error instanceof Error
                            ? error.message
                            : String(error));
                    let key = "errors.default";
                    let toastId = "word-error";

                    if (
                        typeof raw === "string" &&
                        raw.includes("already exists")
                    ) {
                        key = "errors.wordExists";
                        toastId = "word-exists";
                    }

                    toast.error(t(key, "This word already exists!"), {
                        theme,
                        toastId,
                    });
                },
            }
        );
    };

    const swapLanguages = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
    };

    return (
        <div className="mx-5 shrink-0">
            <div className="min-w-[240px] flex flex-col gap-4">
                <FontSizeControl
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    labelClass={labelClass}
                />

                <LanguageSelector
                    sourceLang={sourceLang}
                    targetLang={targetLang}
                    setSourceLang={setSourceLang}
                    setTargetLang={setTargetLang}
                    swapLanguages={swapLanguages}
                    inputClass={inputClass}
                    labelClass={labelClass}
                />

                <TranslationForm
                    originState={originState}
                    setOrigin={setOrigin}
                    translation={translation}
                    setTranslation={setTranslation}
                    labelClass={labelClass}
                    inputClass={inputClass}
                    translationInputRef={translationInputRef}
                    handleAdd={handleAdd}
                    isDark={isDark}
                />
            </div>
        </div>
    );
};
