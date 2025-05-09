import { useEffect, useState } from "react";
import UserService from "../../features/user/userService";
import UserStorage from "../storage/userStorage";

interface UseCurrentUserResult {
    user: { id: string; nickname: string } | null;
    loading: boolean;
    error: boolean;
    logout: () => void;
}

const useCurrentUser = (): UseCurrentUserResult => {
    const [user, setUser] = useState<{ id: string; nickname: string } | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const stored = UserStorage.get();
        if (!stored?.id) {
            setLoading(false);
            setError(true);
            return;
        }

        UserService.getUser(stored.id)
            .then((fetchedUser) => {
                setUser({ id: fetchedUser.id, nickname: fetchedUser.nickname });
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setUser(null);
                setLoading(false);
            });
    }, []);

    const logout = () => {
        UserService.logout();
        setUser(null);
        setError(true);
    };

    return { user, loading, error, logout };
};

export default useCurrentUser;
