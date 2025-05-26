import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/auth-service";
import type { CreateUserDto } from "../dto/create-user.dto";
import { GetUserDto } from "../dto/get-user.dto";
import { UserConfig } from "../../user-config/types/user-config";

// Hook for fetching all users
export const useGetAllUsers = () =>
    useQuery<GetUserDto[]>({
        queryKey: ["users"],
        queryFn: AuthService.getAllUsers,
    });

// Hook for creating a new user
export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userData: CreateUserDto) =>
            AuthService.createUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

// Hook for fetching a user by ID
export const useGetUserById = (id: string) =>
    useQuery<GetUserDto | null>({
        queryKey: ["user", id],
        queryFn: () => AuthService.getUserById(id),
        enabled: !!id, // Only fetch if id exists
    });

export const useGetFullUserById = (id: string) =>
    useQuery<UserConfig | null>({
        queryKey: ["fullUser", id],
        queryFn: () => AuthService.getFullUserById(id),
        enabled: !!id,
    });
