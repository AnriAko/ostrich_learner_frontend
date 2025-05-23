import { useState, useEffect } from "react";
import { UserContext } from "./user-context";
import type { User } from "../../../features/userConfig/types/user";
import type { ReactNode } from "react";
import { USER_LOCAL_STORAGE_KEY } from "./user-local-storage";
import { useTheme } from "../theme-context/use-theme";
import { useInterfaceLanguage } from "../language-context/use-interface-language";
import i18n from "../../language/i18n";

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(() => {
        const stored = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
        try {
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const { theme: currentTheme, setTheme } = useTheme();
    const { interfaceLanguage: currentLanguage, setInterfaceLanguage } =
        useInterfaceLanguage();

    useEffect(() => {
        if (user) {
            if (user.theme !== currentTheme) {
                setTheme(user.theme);
            }
            if (user.interfaceLanguage !== currentLanguage) {
                setInterfaceLanguage(user.interfaceLanguage);
                i18n.changeLanguage(user.interfaceLanguage);
            }
        }
    }, [user, currentLanguage, setInterfaceLanguage, currentTheme, setTheme]);

    const setUser = (user: User | null) => {
        if (user) {
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
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
