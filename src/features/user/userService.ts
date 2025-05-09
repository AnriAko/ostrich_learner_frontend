import axiosInstance from "../../shared/api/axiosInstance";
import UserStorage from "../../shared/storage/userStorage";

class UserService {
    login(id: string, nickname: string) {
        UserStorage.set(id, nickname);
    }

    logout() {
        UserStorage.clear();
    }

    getCurrentUserId(): { id: string; nickname: string } | null {
        return UserStorage.get();
    }
    async createUser(nickname: string) {
        try {
            const response = await axiosInstance.post("/users", { nickname });
            return response.data;
        } catch (error) {
            console.error("Failed to create user", error);
            throw error;
        }
    }

    async updateUser(userId: string, nickname: string) {
        try {
            const response = await axiosInstance.patch(`/users/${userId}`, {
                nickname,
            });
            return response.data;
        } catch (error) {
            console.error("Failed to update user", error);
            throw error;
        }
    }

    async getUser(userId: string) {
        try {
            const response = await axiosInstance.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch user", error);
            throw error;
        }
    }

    async deleteUser(userId: string) {
        try {
            const response = await axiosInstance.delete(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Failed to delete user", error);
            throw error;
        }
    }
}

export default new UserService();
