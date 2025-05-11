import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserConfigService } from "../services/UserConfigService";
import type { UserConfig } from "../type/user-config";
import type { InterfaceLanguage } from "../type/interface-language.enum";
import type { Theme } from "../type/theme.enum";

// Correct return type of Promise<UserConfig>
export const useUserConfig = (userId: string) =>
    useQuery<UserConfig>({
        queryKey: ["user-config", userId],
        queryFn: (): Promise<UserConfig> =>
            UserConfigService.getUserConfig(userId),
        enabled: !!userId,
    });

// Correct mutation return type of Promise<UserConfig>
export const useUpdateNickname = (userId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (nickname: string): Promise<UserConfig> =>
            UserConfigService.updateNickname(userId, nickname),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user-config", userId],
            });
        },
    });
};

// Correct mutation return type of Promise<UserConfig>
export const useUpdateLanguage = (userId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (language: InterfaceLanguage): Promise<UserConfig> =>
            UserConfigService.updateLanguage(userId, language),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user-config", userId],
            });
        },
    });
};

// Correct mutation return type of Promise<UserConfig>
export const useUpdateTheme = (userId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (theme: Theme): Promise<UserConfig> =>
            UserConfigService.updateTheme(userId, theme),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user-config", userId],
            });
        },
    });
};
