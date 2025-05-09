import { createContext } from "react";

export interface User {
    id: string;
    nickname: string;
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    error: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);
