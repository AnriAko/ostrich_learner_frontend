import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/AuthService";
import type { CreateUserDto } from "../dto/createUser.dto";
import { GetUserDto } from "../dto/getUser.dto";

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
            queryClient.invalidateQueries(["users"]);
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
