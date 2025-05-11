import { createContext } from "react";
import type { User } from "./UserTypes";

export interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);
