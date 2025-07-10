import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../service/user.service";
import type { UpdateNicknameDto } from "../../../dto/update-nickname.dto";
import type { FullUserProfileDto } from "../../../dto/full-user-profile.dto";

const USER_PROFILE_QUERY_KEY = (userId: string) => ["user", "profile", userId];

export const useGetUserProfile = (userId: string) => {
    return useQuery<FullUserProfileDto>({
        queryKey: USER_PROFILE_QUERY_KEY(userId),
        queryFn: () => UserService.getFullProfile(userId),
        enabled: !!userId,
    });
};

export const useUpdateNickname = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: UpdateNicknameDto) =>
            UserService.updateNickname(userId, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: USER_PROFILE_QUERY_KEY(userId),
            });
        },
    });
};

export const useDeleteUser = (userId: string) => {
    return useMutation({
        mutationFn: () => UserService.deleteUser(userId),
    });
};
