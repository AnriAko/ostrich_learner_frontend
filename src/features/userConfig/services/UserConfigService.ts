// src/services/UserConfigService.ts
import axiosInstance from "../../../shared/api/axiosInstance";
import { InterfaceLanguage } from "../type/interface-language.enum";
import { Theme } from "../type/theme.enum";
import type { UserConfig } from "../type/user-config"; // ensure this type is correct

export class UserConfigService {
    static async getUserConfig(userId: string): Promise<UserConfig> {
        const response = await axiosInstance.get(`/user-config/${userId}`);
        // Ensure that response.data matches the UserConfig type
        return response.data; // Should be an object with userId, nickname, interfaceLanguage, theme
    }

    static async updateNickname(
        userId: string,
        nickname: string
    ): Promise<UserConfig> {
        const response = await axiosInstance.patch(
            `/user-config/${userId}/nickname`,
            { nickname }
        );
        return response.data; // Ensure the data structure is correct
    }

    static async updateLanguage(
        userId: string,
        language: InterfaceLanguage
    ): Promise<UserConfig> {
        const response = await axiosInstance.patch(
            `/user-config/${userId}/language`,
            { language }
        );
        return response.data; // Ensure the data structure is correct
    }

    static async updateTheme(
        userId: string,
        theme: Theme
    ): Promise<UserConfig> {
        const response = await axiosInstance.patch(
            `/user-config/${userId}/theme`,
            { theme }
        );
        return response.data; // Ensure the data structure is correct
    }
}
