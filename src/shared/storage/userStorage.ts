class UserStorage {
    private static key = "currentUser";

    static set(id: string, nickname: string) {
        const user = { id, nickname };
        localStorage.setItem(this.key, JSON.stringify(user));
    }

    static get(): { id: string; nickname: string } | null {
        const data = localStorage.getItem(this.key);
        if (!data) return null;

        try {
            return JSON.parse(data);
        } catch {
            return null;
        }
    }

    static getId(): string | null {
        const user = this.get();
        return user?.id || null;
    }

    static getNickname(): string | null {
        const user = this.get();
        return user?.nickname || null;
    }

    static clear() {
        localStorage.removeItem(this.key);
    }
}

export default UserStorage;
