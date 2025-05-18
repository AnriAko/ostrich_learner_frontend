import { createContext } from "react";
import { InterfaceLanguage } from "../../../features/userConfig/types/interface-language";

export interface InterfaceLanguageContextType {
    interfaceLanguage: InterfaceLanguage | null;
    setInterfaceLanguage: (interfaceLanguage: InterfaceLanguage | null) => void;
}

export const InterfaceLanguageContext = createContext<
    InterfaceLanguageContextType | undefined
>(undefined);
