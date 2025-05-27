// src/features/add-words/hooks/use-add-word-logic.ts
import { useState } from "react";
import { useCreateWord } from "../../hooks/use-word";
import { useUser } from "../../../../shared/context/user-context/use-user";
import type { CreateWordDto } from "../dto/create-word.dto";
import { Language } from "../../types/language";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useAddWordLogic = () => {
    const { user } = useUser();
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
            word: word.trim(),
            translate: translate.trim(),
            sourceLang,
            targetLang,
        };

        mutate(dto, {
            onSuccess: () => {
                toast.success(t("wordAdded", "Word successfully added!"));
                setWord("");
                setTranslate("");
            },
            onError: (error: any) => {
                const raw =
                    error?.response?.data?.message?.message ||
                    error?.message ||
                    "";

                let key = "errors.default";
                if (raw.includes("already exists")) {
                    key = "errors.wordExists";
                }

                toast.error(t(key, "This word already exists!"));
            },
        });
    };

    const onPracticeClick = () => {
        console.log("Go to practice page"); // replace with real logic
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
        onPracticeClick,
    };
};
