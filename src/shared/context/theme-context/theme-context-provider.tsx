import { useState, useEffect } from "react";
import { ThemeContext } from "./theme-context";
import { Theme } from "../../../features/user-config/types/theme";
import type { ReactNode } from "react";
import { THEME_LOCAL_STORAGE_KEY } from "./theme-local-storage";

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const getSystemTheme = (): Theme =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? Theme.dark
            : Theme.light;

    const getInitialTheme = (): Theme => {
        const stored = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse theme from localStorage", e);
            }
        }
        return getSystemTheme();
    };

    const [theme, setThemeState] = useState<Theme>(getInitialTheme);
    const [isManuallySelected, setManuallySelected] = useState<boolean>(
        () => !!localStorage.getItem(THEME_LOCAL_STORAGE_KEY)
    );

    const setTheme = (newTheme: Theme) => {
        localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify(newTheme));
        setThemeState(newTheme);
        setManuallySelected(true);
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (!isManuallySelected) {
                setThemeState(mediaQuery.matches ? Theme.dark : Theme.light);
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [isManuallySelected]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
