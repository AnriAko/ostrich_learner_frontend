import { useState } from "react";
import { UserContext } from "./UserContext";
import type { User } from "./UserTypes";
import type { ReactNode } from "react";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
