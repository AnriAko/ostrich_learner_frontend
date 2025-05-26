import { InterfaceLanguage } from "../../features/user-config/types/interface-language";
import { Theme } from "../../features/user-config/types/theme";
import { UserConfig } from "../../features/user-config/types/user-config";

class UserStorage {
    private static key = "currentUser";

    static set(user: UserConfig) {
        localStorage.setItem(this.key, JSON.stringify(user));
    }

    static get(): UserConfig | null {
        const data = localStorage.getItem(this.key);
        if (!data) return null;

        try {
            return JSON.parse(data);
        } catch {
            return null;
        }
    }

    static getId(): string | null {
        const user: UserConfig | null = this.get();
        return user?.userId || null;
    }

    static getNickname(): string | null {
        const user = this.get();
        return user?.nickname || null;
    }

    static getTheme(): Theme | null {
        const user = this.get();
        return user?.theme || null;
    }
    static getInterfaceLanguage(): InterfaceLanguage | null {
        const user = this.get();
        return user?.interfaceLanguage || null;
    }

    static clear() {
        localStorage.removeItem(this.key);
    }
}

export default UserStorage;
