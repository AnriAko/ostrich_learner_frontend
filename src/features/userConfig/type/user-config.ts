import { InterfaceLanguage } from "./interface-language.enum";
import { Theme } from "./theme.enum";

export type UserConfig = {
    userId: string;
    nickname: string;
    interfaceLanguage: InterfaceLanguage;
    theme: Theme;
};
