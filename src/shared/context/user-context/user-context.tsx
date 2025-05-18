import { createContext } from "react";
import type { UserConfig } from "../../../features/userConfig/types/user-config";

export interface UserContextType {
    user: UserConfig | null;
    setUser: (user: UserConfig | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);
