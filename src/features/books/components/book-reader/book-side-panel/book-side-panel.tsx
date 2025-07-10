import React, {
    useState,
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../../user-config/types/theme";
import { useUser } from "../../../../../shared/context/user-context/use-user";
import { Language, SupportedLanguages } from "../../../../words/types/language";
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

export interface BookSidePanelHandles {
    focusTranslationInput: () => void;
}

const LS_KEY_LANGS = "bookSidePanelLanguages";

export const BookSidePanel = forwardRef<
    BookSidePanelHandles,
    BookSidePanelProps
>(({ fontSize, setFontSize, page, posId, origin }, ref) => {
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

    const [sourceLang, setSourceLang] = useState<Language>(() => {
        try {
            const saved = localStorage.getItem(LS_KEY_LANGS);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (
                    parsed?.sourceLang &&
                    SupportedLanguages.some((l) => l.id === parsed.sourceLang)
                ) {
                    return parsed.sourceLang;
                }
            }
        } catch {
            //ignore
        }
        return Language.English;
    });

    const [targetLang, setTargetLang] = useState<Language>(() => {
        try {
            const saved = localStorage.getItem(LS_KEY_LANGS);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (
                    parsed?.targetLang &&
                    SupportedLanguages.some((l) => l.id === parsed.targetLang)
                ) {
                    return parsed.targetLang;
                }
            }
        } catch {
            //ignore
        }
        return Language.Georgian;
    });

    useEffect(() => {
        localStorage.setItem(
            LS_KEY_LANGS,
            JSON.stringify({
                sourceLang,
                targetLang,
            })
        );
    }, [sourceLang, targetLang]);

    const translationInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focusTranslationInput: () => {
            translationInputRef.current?.focus();
        },
    }));

    useEffect(() => {
        setOrigin(origin);
        setTranslation("");
    }, [origin]);

    const addMutation = useAddTranslation();

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        (document.activeElement as HTMLElement)?.blur();

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

        const visiblePages = Array.from(
            document.querySelectorAll("[data-pageid]")
        ).map((el) => parseInt(el.getAttribute("data-pageid") || "0", 10));

        addMutation.mutate(
            { bookId: bookId!, dto, visiblePages },
            {
                onSuccess: () => {
                    toast.success(t("wordAdded", "Word successfully added!"), {
                        theme,
                        toastId: "word-added",
                    });
                    setOrigin("");
                    setTranslation("");
                },
                onError: (error: unknown) => {
                    interface ErrorResponse {
                        message?: string | { message?: string };
                    }

                    const e = error as AxiosError<ErrorResponse>;

                    const raw =
                        typeof e?.response?.data?.message === "string"
                            ? e.response.data.message
                            : typeof e?.response?.data?.message?.message ===
                              "string"
                            ? e.response.data.message.message
                            : undefined;

                    const errorMessage =
                        raw ||
                        e?.message ||
                        (error instanceof Error
                            ? error.message
                            : String(error));

                    let key = "errors.default";
                    let toastId = "word-error";

                    if (
                        typeof errorMessage === "string" &&
                        errorMessage.includes("already exists")
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
            <div className="min-w-[200px] flex flex-col gap-4">
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
});
