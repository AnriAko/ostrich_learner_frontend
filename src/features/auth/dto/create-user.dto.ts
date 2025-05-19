import { Theme } from "../../userConfig/types/theme";
import { InterfaceLanguage } from "../../userConfig/types/interface-language";

export interface CreateUserDto {
    nickname: string;
    theme: Theme;
    interfaceLanguage: InterfaceLanguage;
}
