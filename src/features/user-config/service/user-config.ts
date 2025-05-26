import api from "../../../shared/api/axios-instance";
import { InterfaceLanguage } from "../types/interface-language";
import { Theme } from "../types/theme";
import { UserConfig } from "../types/user-config";

const USER_CONFIG_URL = "user-config";
const NICKNAME = "nickname";
const INTERFACE_LANGUAGE = "interface-language";
const THEME = "theme";

export const getUserConfig = async (
    userId: string
): Promise<UserConfig | null> => {
    if (!userId) {
        return null;
    }

    try {
        const { data } = await api.get(`${USER_CONFIG_URL}/${userId}`);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateUserNickname = async (
    userId: string,
    nickname: string
): Promise<UserConfig | null> => {
    if (!userId) {
        return null;
    }

    try {
        const { data } = await api.patch(
            `${USER_CONFIG_URL}/${userId}/${NICKNAME}`,
            { nickname: nickname }
        );
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateUserTheme = async (
    userId: string,
    theme: Theme
): Promise<UserConfig | null> => {
    if (!userId) {
        return null;
    }
    try {
        const { data } = await api.patch(
            `${USER_CONFIG_URL}/${userId}/${THEME}`,
            { theme: theme }
        );
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateUserInterfaceLanguage = async (
    userId: string,
    interfaceLanguage: InterfaceLanguage
): Promise<UserConfig | null> => {
    if (!userId) {
        return null;
    }
    try {
        const { data } = await api.patch(
            `${USER_CONFIG_URL}/${userId}/${INTERFACE_LANGUAGE}`,
            { interfaceLanguage: interfaceLanguage }
        );
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
