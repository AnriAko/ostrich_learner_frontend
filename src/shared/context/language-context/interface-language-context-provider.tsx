import { useEffect, useState } from "react";
import { InterfaceLanguageContext } from "../language-context/interface-language-context";
import { InterfaceLanguage } from "../../../features/user-config/types/interface-language";
import type { ReactNode } from "react";
import { INTERFACE_LANGUAGE_LOCAL_STORAGE_KEY } from "./interface-language-local-storage";
import i18n from "../../language/i18n";

export const InterfaceLanguageContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const getInitialLanguage = (): InterfaceLanguage => {
        const stored = localStorage.getItem(
            INTERFACE_LANGUAGE_LOCAL_STORAGE_KEY
        );
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error(
                    "Failed to parse InterfaceLanguage from localStorage",
                    e
                );
            }
        }
        return InterfaceLanguage.English;
    };

    const [interfaceLanguage, setInterfaceLanguageState] =
        useState<InterfaceLanguage>(getInitialLanguage);

    const [isLanguageReady, setIsLanguageReady] = useState(false);

    const setInterfaceLanguage = (language: InterfaceLanguage | null) => {
        if (language) {
            localStorage.setItem(
                INTERFACE_LANGUAGE_LOCAL_STORAGE_KEY,
                JSON.stringify(language)
            );
            setInterfaceLanguageState(language);
        } else {
            localStorage.removeItem(INTERFACE_LANGUAGE_LOCAL_STORAGE_KEY);
            setInterfaceLanguageState(InterfaceLanguage.English);
        }
    };

    useEffect(() => {
        const langCode = interfaceLanguage.toLowerCase();
        if (i18n.language !== langCode) {
            i18n.changeLanguage(langCode).then(() => {
                setIsLanguageReady(true);
            });
        } else {
            setIsLanguageReady(true);
        }
    }, [interfaceLanguage]);

    if (!isLanguageReady) return null;

    return (
        <InterfaceLanguageContext.Provider
            value={{ interfaceLanguage, setInterfaceLanguage }}
        >
            {children}
        </InterfaceLanguageContext.Provider>
    );
};
