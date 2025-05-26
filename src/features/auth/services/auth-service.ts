import api from "../../../shared/api/axios-instance";
import type { CreateUserDto } from "../dto/create-user.dto";
import { GetUserDto } from "../dto/get-user.dto";
import { UserConfig } from "../../user-config/types/user-config";

const ROUTE_URL = "user";
export class AuthService {
    static async getAllUsers() {
        const response = await api.get(`${ROUTE_URL}`);
        return response.data;
    }

    static async createUser(userData: CreateUserDto) {
        const response = await api.post(`${ROUTE_URL}`, userData);
        return response.data;
    }

    static async getUserById(id: string): Promise<GetUserDto | null> {
        const response = await api.get(`${ROUTE_URL}/${id}`);
        return response.data;
    }

    static async getFullUserById(id: string): Promise<UserConfig | null> {
        const response = await api.get(`${ROUTE_URL}-config/${id}`);
        return response.data;
    }
}
