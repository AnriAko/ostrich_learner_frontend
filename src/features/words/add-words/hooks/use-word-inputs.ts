import { useState, ChangeEvent } from "react";

export const useWordInputs = () => {
    const [word, setWord] = useState("");
    const [translate, setTranslate] = useState("");

    const onWordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    };

    const onTranslateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTranslate(e.target.value);
    };

    return {
        word,
        translate,
        onWordChange,
        onTranslateChange,
        setWord,
        setTranslate,
    };
};
