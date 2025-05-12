// src/services/AuthService.ts
import axiosInstance from "../../../shared/api/axiosInstance";
import type { CreateUserDto } from "../dto/createUser.dto";
import { GetUserDto } from "../dto/getUser.dto";
import { User } from "../../../shared/context/UserTypes";

const ROUTE_URL = "user";
export class AuthService {
    static async getAllUsers() {
        const response = await axiosInstance.get(`${ROUTE_URL}`);
        return response.data;
    }

    static async createUser(userData: CreateUserDto) {
        const response = await axiosInstance.post(`${ROUTE_URL}`, userData);
        return response.data;
    }

    static async getUserById(id: string): Promise<GetUserDto | null> {
        const response = await axiosInstance.get(`${ROUTE_URL}/${id}`);
        return response.data;
    }

    static async getFullUserById(id: string): Promise<User | null> {
        const response = await axiosInstance.get(`${ROUTE_URL}/profile/${id}`);
        return response.data;
    }
}
