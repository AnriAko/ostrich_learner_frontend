import { useState } from "react";

export const useMessageBoxLogic = () => {
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const onPracticeClick = () => {
        setMessage(null);
    };

    return {
        message,
        setMessage,
        onPracticeClick,
    };
};
