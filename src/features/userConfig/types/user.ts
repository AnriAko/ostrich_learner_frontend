import type { InterfaceLanguage } from "./interface-language";
import type { Theme } from "./theme";

export interface User {
    userId: string;
    nickname: string;
    theme: Theme;
    interfaceLanguage: InterfaceLanguage;
}
