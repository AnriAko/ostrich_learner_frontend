const TEST_SESSION_KEY = "testSessionData";

export function saveTestSession(session: unknown) {
    try {
        const serialized = JSON.stringify(session);
        localStorage.setItem(TEST_SESSION_KEY, serialized);
    } catch {
        return null;
    }
}

export function loadTestSession(): unknown | null {
    try {
        const serialized = localStorage.getItem(TEST_SESSION_KEY);
        if (!serialized) return null;
        return JSON.parse(serialized);
    } catch {
        return null;
    }
}

export function clearTestSession() {
    try {
        localStorage.removeItem(TEST_SESSION_KEY);
    } catch {
        return null;
    }
}
