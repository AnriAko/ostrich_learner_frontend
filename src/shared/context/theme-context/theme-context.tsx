import { createContext } from "react";
import type { Theme } from "../../../features/user-config/types/theme";

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);
