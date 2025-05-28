import {
    useQuery,
    useMutation,
    useQueryClient,
    UseMutationResult,
    UseQueryResult,
} from "@tanstack/react-query";
import { WordService } from "../service/words-service";
import { WordDto } from "../dto/word.dto";
import { CreateWordDto } from "../features/add-words/dto/create-word.dto";
import { UpdateWordDto } from "../dto/update-word.dto";
import { TestWordResponse } from "../dto/test-word-response.dto";
import { TestWordDto } from "../dto/test-word.dto";
import { LearningStatsDto } from "../dto/learning-stats.dto";
import { WordFilterDto } from "../dto/word-filter.dto";

interface FilteredWordsResponse {
    data: WordDto[];
    total: number;
}

export const useGetWordById = (id: string): UseQueryResult<WordDto | null> =>
    useQuery({
        queryKey: ["word", id],
        queryFn: () => WordService.getWordById(id),
        enabled: Boolean(id),
    });

export const useCreateWord = (): UseMutationResult<
    WordDto,
    Error,
    CreateWordDto
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: WordService.createWord,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["words"] });
        },
    });
};

export const useUpdateWord = (): UseMutationResult<
    WordDto,
    Error,
    { id: string; data: UpdateWordDto }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => WordService.updateWord(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["word", id] });
            queryClient.invalidateQueries({ queryKey: ["words"] });
        },
    });
};

export const useDeleteWord = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: WordService.deleteWord,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["words"] });
        },
    });
};

export const useTestWord = (): UseMutationResult<
    TestWordResponse,
    Error,
    { id: string; data: TestWordDto }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => WordService.testWord(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["word", id] });
            queryClient.invalidateQueries({ queryKey: ["learningStats"] });
        },
    });
};

export const useGetWordsByVocabulary = (
    vocabularyId: string
): UseQueryResult<WordDto[]> =>
    useQuery({
        queryKey: ["words", "vocabulary", vocabularyId],
        queryFn: () => WordService.getWordsByVocabulary(vocabularyId),
        enabled: Boolean(vocabularyId),
    });

export const useGetWordsByUser = (userId: string): UseQueryResult<WordDto[]> =>
    useQuery({
        queryKey: ["words", "user", userId],
        queryFn: () => WordService.getWordsByUser(userId),
        enabled: Boolean(userId),
    });

export const useGetLearningStats = (
    userId: string
): UseQueryResult<LearningStatsDto> =>
    useQuery({
        queryKey: ["learningStats", userId],
        queryFn: () => WordService.getLearningStats(userId),
        enabled: Boolean(userId),
    });

export const useGetAvailableForLearning = (
    userId: string
): UseQueryResult<WordDto[]> =>
    useQuery({
        queryKey: ["words", "availableForLearning", userId],
        queryFn: () => WordService.getAvailableForLearning(userId),
        enabled: Boolean(userId),
    });

export const useGetWordsForRepetition = (
    userId: string
): UseQueryResult<WordDto[]> =>
    useQuery({
        queryKey: ["words", "forRepetition", userId],
        queryFn: () => WordService.getWordsForRepetition(userId),
        enabled: Boolean(userId),
    });

export const useGetFilteredWords = (
    filters: WordFilterDto | null | undefined
): UseQueryResult<FilteredWordsResponse> =>
    useQuery<FilteredWordsResponse, Error>({
        queryKey: ["words", "filtered", filters],
        queryFn: () => WordService.getFilteredWords(filters!),
        enabled: Boolean(filters),
    });
