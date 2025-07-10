import api from "../../../../../shared/api/axios-instance";
import type { LearningStatByDay } from "../types/achievement.types";

const ROUTE_URL = "word";

export class AchievementService {
    static async getLearningStatsByDay(
        userId: string
    ): Promise<LearningStatByDay[]> {
        const { data } = await api.get<LearningStatByDay[]>(
            `${ROUTE_URL}/user/${userId}/learning-stats`
        );
        return data;
    }

    static async getLearnedWordsCountByMonthForUser(
        userId: string,
        year: number,
        month: number
    ): Promise<LearningStatByDay[]> {
        const { data } = await api.get<LearningStatByDay[]>(
            `${ROUTE_URL}/learned-monthly/all/${userId}`,
            {
                params: { year, month },
            }
        );
        return data;
    }

    static async getLearnedToday(
        userId: string
    ): Promise<{ date: string; count: number }> {
        const { data } = await api.get<{ date: string; count: number }>(
            `${ROUTE_URL}/learned-today/${userId}`
        );
        return data;
    }
}
