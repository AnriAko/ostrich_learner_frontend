// src/services/AuthService.ts
import axiosInstance from "../../../shared/api/axiosInstance";
import type { CreateUserDto } from "../dto/createUser.dto";
import { GetUserDto } from "../dto/getUser.dto";

export class AuthService {
    static async getAllUsers() {
        const response = await axiosInstance.get("/user");
        return response.data;
    }

    static async createUser(userData: CreateUserDto) {
        const response = await axiosInstance.post("/user", userData);
        return response.data;
    }

    static async getUserById(id: string): Promise<GetUserDto | null> {
        const response = await axiosInstance.get(`/user/${id}`);
        return response.data;
    }
}
