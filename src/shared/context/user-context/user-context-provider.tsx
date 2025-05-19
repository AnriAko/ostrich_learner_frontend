// src/shared/context/user-context/user-context-provider.tsx
import { useState, useEffect } from "react";
import { UserContext } from "./user-context";
import type { User } from "../../../features/userConfig/types/user";
import type { ReactNode } from "react";
import { USER_LOCAL_STORAGE_KEY } from "./user-local-storage";
import { useTheme } from "../theme-context/use-theme";
import { useInterfaceLanguage } from "../language-context/use-interface-language";
import i18n from "../../language/i18n";

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);
    const { setTheme } = useTheme();
    const { setInterfaceLanguage } = useInterfaceLanguage();

    useEffect(() => {
        const storedUser = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
        if (storedUser) {
            try {
                const parsedUser: User = JSON.parse(storedUser);
                setUserState(parsedUser);
                setTheme(parsedUser.theme);
                setInterfaceLanguage(parsedUser.interfaceLanguage);
                i18n.changeLanguage(parsedUser.interfaceLanguage);
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
            }
        }
    }, [setTheme, setInterfaceLanguage]);

    const setUser = (user: User | null) => {
        if (user) {
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
            setTheme(user.theme);
            setInterfaceLanguage(user.interfaceLanguage);
        } else {
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        }
        setUserState(user);
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
