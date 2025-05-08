class UserStorage {
    private static key = "userId";

    static set(id: string) {
        localStorage.setItem(this.key, id);
    }

    static get(): string | null {
        return localStorage.getItem(this.key);
    }

    static clear() {
        localStorage.removeItem(this.key);
    }
}

export default UserStorage;
