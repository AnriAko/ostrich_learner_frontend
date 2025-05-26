// src/features/add-words/hooks/use-add-word-logic.ts
import { useState } from "react";
import { useCreateWord } from "../../hooks/use-word";
import { useUser } from "../../../../shared/context/user-context/use-user";
import type { CreateWordDto } from "../dto/create-word.dto";

export const useAddWordLogic = () => {
    const { user } = useUser();
    const { mutate, isPending } = useCreateWord();

    const [word, setWord] = useState("");
    const [translate, setTranslate] = useState("");
    const [sourceLang, setSourceLang] = useState("en");
    const [targetLang, setTargetLang] = useState("ru");

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

        mutate(dto);
        setWord("");
        setTranslate("");
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
