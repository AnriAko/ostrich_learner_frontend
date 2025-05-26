import { Theme } from "../../user-config/types/theme";
import { InterfaceLanguage } from "../../user-config/types/interface-language";

export interface CreateUserDto {
    nickname: string;
    theme: Theme;
    interfaceLanguage: InterfaceLanguage;
}
