import {
    useQuery,
    useMutation,
    useQueryClient,
    UseMutationResult,
    UseQueryResult,
} from "@tanstack/react-query";
import { WordService } from "../service/words-service";
import type { CreateWordDto } from "../features/add-words/dto/create-word.dto";
import type { UpdateWordDto } from "../dto/update-word.dto";
import type { TestWordDto } from "../dto/test-word.dto";
import type { WordDto } from "../dto/word.dto";
import type { LearningStatsDto } from "../dto/learning-stats.dto";
import type { TestWordResponse } from "../dto/test-word-response.dto";

export const useGetWordById = (id: string): UseQueryResult<WordDto | null> =>
    useQuery({
        queryKey: ["word", id],
        queryFn: () => WordService.getWordById(id),
        enabled: !!id,
    });

export const useCreateWord = (): UseMutationResult<
    WordDto,
    Error,
    CreateWordDto
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateWordDto) => WordService.createWord(data),
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
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["word", variables.id] });
            queryClient.invalidateQueries({ queryKey: ["words"] });
        },
    });
};

export const useDeleteWord = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => WordService.deleteWord(id),
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["word"] });
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
        enabled: !!vocabularyId,
    });

export const useGetWordsByUser = (userId: string): UseQueryResult<WordDto[]> =>
    useQuery({
        queryKey: ["words", "user", userId],
        queryFn: () => WordService.getWordsByUser(userId),
        enabled: !!userId,
    });

export const useGetLearningStats = (
    userId: string
): UseQueryResult<LearningStatsDto> =>
    useQuery({
        queryKey: ["learningStats", userId],
        queryFn: () => WordService.getLearningStats(userId),
        enabled: !!userId,
    });

export const useGetAvailableForTestWords = (
    vocabularyId: string
): UseQueryResult<WordDto[]> =>
    useQuery({
        queryKey: ["words", "availableForTest", vocabularyId],
        queryFn: () => WordService.getAvailableForTestWords(vocabularyId),
        enabled: !!vocabularyId,
    });

export const useGetWordsForRepetition = (
    vocabularyId: string
): UseQueryResult<WordDto[]> =>
    useQuery({
        queryKey: ["words", "forRepetition", vocabularyId],
        queryFn: () => WordService.getWordsForRepetition(vocabularyId),
        enabled: !!vocabularyId,
    });
