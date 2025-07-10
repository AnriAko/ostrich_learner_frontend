import api from "../../../../../shared/api/axios-instance";
import type { UpdateNicknameDto } from "../../../dto/update-nickname.dto";
import type { FullUserProfileDto } from "../../../dto/full-user-profile.dto";

const ROUTE_URL = "user";

export class UserService {
    static async getFullProfile(userId: string): Promise<FullUserProfileDto> {
        const { data } = await api.get<FullUserProfileDto>(
            `${ROUTE_URL}/profile/${userId}`
        );
        return data;
    }

    static async updateNickname(
        userId: string,
        dto: UpdateNicknameDto
    ): Promise<{ id: string; nickname: string }> {
        const { data } = await api.patch<{ id: string; nickname: string }>(
            `${ROUTE_URL}/${userId}/nickname`,
            dto
        );
        return data;
    }

    static async deleteUser(userId: string): Promise<void> {
        await api.delete(`${ROUTE_URL}/${userId}`);
    }
}
