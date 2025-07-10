import { useContext } from "react";
import { InterfaceLanguageContext } from "./interface-language-context";

export const useInterfaceLanguage = () => {
    const context = useContext(InterfaceLanguageContext);
    if (!context)
        throw new Error(
            "useInterfaceLanguage must be used within InterfaceLanguageProvider"
        );
    return context;
};
