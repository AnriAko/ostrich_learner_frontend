import { useQuery } from "@tanstack/react-query";
import { AchievementService } from "../service/achievements.service";

const LEARNED_WORDS_COUNT_BY_MONTH_FOR_USER_QUERY_KEY = (
    userId: string,
    year: number,
    month: number
) => ["achievement", "learnedWordsCountByMonthForUser", userId, year, month];

export const useLearnedWordsCountByMonthForUser = (
    userId: string,
    year: number,
    month: number
) => {
    return useQuery({
        queryKey: LEARNED_WORDS_COUNT_BY_MONTH_FOR_USER_QUERY_KEY(
            userId,
            year,
            month
        ),
        queryFn: () =>
            AchievementService.getLearnedWordsCountByMonthForUser(
                userId,
                year,
                month
            ),
        enabled: !!userId && !!year && !!month,
        staleTime: 0,
        refetchOnMount: "always",
    });
};
