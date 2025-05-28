// src/features/add-words/hooks/use-add-word-logic.ts
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useTheme } from "../../../../../shared/context/theme-context/use-theme";
import { useUser } from "../../../../../shared/context/user-context/use-user";
import type { CreateWordDto } from "../../../features/add-words/dto/create-word.dto";
import { useCreateWord } from "../../../hooks/use-word";
import { Language } from "../../../types/language";

export const useAddWordLogic = () => {
    const { user } = useUser();
    const { theme } = useTheme();
    const [word, setWord] = useState("");
    const [translate, setTranslate] = useState("");
    const [sourceLang, setSourceLang] = useState<Language>(Language.English);
    const [targetLang, setTargetLang] = useState<Language>(Language.Georgian);
    const { t } = useTranslation();

    const { mutate, isPending } = useCreateWord();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!word.trim() || !translate.trim() || !user?.userId) return;

        const dto: CreateWordDto = {
            userId: user.userId,
            origin: word.trim(),
            translation: translate.trim(),
            sourceLang,
            targetLang,
        };

        mutate(dto, {
            onSuccess: () => {
                toast.success(t("wordAdded", "Word successfully added!"), {
                    theme,
                    toastId: "word-added",
                });
                setWord("");
                setTranslate("");
            },
            onError: (error: any) => {
                const raw =
                    error?.response?.data?.message?.message ||
                    error?.message ||
                    "";

                let key = "errors.default";
                let toastId = "word-error";

                if (raw.includes("already exists")) {
                    key = "errors.wordExists";
                    toastId = "word-exists";
                }

                toast.error(t(key, "This word already exists!"), {
                    theme,
                    toastId, // ✅ toastId для разных ошибок
                });
            },
        });
    };

    return {
        handleSubmit,
        isLoading: isPending,
        word,
        translate,
        setWord,
        setTranslate,
        sourceLang,
        targetLang,
        setSourceLang,
        setTargetLang,
    };
};
