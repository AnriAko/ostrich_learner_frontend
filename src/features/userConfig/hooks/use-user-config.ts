import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getUserConfig,
    updateUserInterfaceLanguage,
    updateUserNickname,
    updateUserTheme,
} from "../service/user-config";
import { Theme } from "../types/theme";
import { InterfaceLanguage } from "../types/interface-language";
import { useUser } from "../../../shared/context/user-context/use-user";
import UserStorage from "../../../shared/storage/user-storage";
import i18n from "../../../shared/language/i18n";

import { useTheme } from "../../../shared/context/theme-context/use-theme";
import { useInterfaceLanguage } from "../../../shared/context/language-context/use-interface-language";

export const useGetUserConfig = (userId: string) => {
    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserConfig(userId),
        enabled: !!userId,
    });
};

export const useUpdateUserNickname = () => {
    const { setUser } = useUser();
    return useMutation({
        mutationFn: ({
            userId,
            nickname,
        }: {
            userId: string;
            nickname: string;
        }) => updateUserNickname(userId, nickname),
        onSuccess: (data) => {
            setUser(data!);
            UserStorage.set(data!);
        },
    });
};

export const useUpdateUserTheme = () => {
    const { setUser } = useUser();
    const { setTheme } = useTheme();

    return useMutation({
        mutationFn: ({ userId, theme }: { userId: string; theme: Theme }) =>
            updateUserTheme(userId, theme),
        onSuccess: (config) => {
            if (!config) return;
            setUser(config);
            UserStorage.set(config);
            setTheme(config.theme);
        },
    });
};

export const useUpdateUserInterfaceLanguage = () => {
    const { setUser } = useUser();
    const { setInterfaceLanguage } = useInterfaceLanguage();

    return useMutation({
        mutationFn: ({
            userId,
            interfaceLanguage,
        }: {
            userId: string;
            interfaceLanguage: InterfaceLanguage;
        }) => updateUserInterfaceLanguage(userId, interfaceLanguage),
        onSuccess: (data) => {
            setUser(data!);
            UserStorage.set(data!);
            i18n.changeLanguage(data!.interfaceLanguage);
            setInterfaceLanguage(data!.interfaceLanguage); // Обновляем язык интерфейса из контекста
        },
    });
};
