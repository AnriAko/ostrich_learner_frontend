import type { InterfaceLanguage } from "./interface-language";
import type { Theme } from "./theme";

export interface UserConfig {
    userId: string;
    nickname: string;
    theme: Theme;
    interfaceLanguage: InterfaceLanguage;
}
