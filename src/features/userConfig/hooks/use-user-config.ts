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

    return useMutation({
        mutationFn: ({ userId, theme }: { userId: string; theme: Theme }) =>
            updateUserTheme(userId, theme),
        onSuccess: (config) => {
            if (!config) return;
            setUser(config);
            UserStorage.set(config);
        },
    });
};

export const useUpdateUserInterfaceLanguage = () => {
    const { setUser } = useUser();
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
            i18n.changeLanguage(data!.interfaceLanguage).then(() => {
                console.log("Language changed to:", i18n.language);
            });
        },
    });
};
