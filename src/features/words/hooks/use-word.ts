import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WordService } from "../service/add-words-service";
import type { CreateWordDto } from "../dto/create-word.dto";
import type { UpdateWordDto } from "../dto/update-word.dto";
import type { TestWordDto } from "../dto/test-word.dto";
import type { WordDto } from "../dto/word.dto";
import type { LearningStatsDto } from "../dto/learning-stats.dto";

export const useGetWordById = (id: string) =>
    useQuery<WordDto | null>({
        queryKey: ["word", id],
        queryFn: () => WordService.getWordById(id),
        enabled: !!id,
    });

export const useCreateWord = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateWordDto) => WordService.createWord(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["words"] });
        },
    });
};

export const useUpdateWord = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateWordDto }) =>
            WordService.updateWord(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["word", variables.id] });
            queryClient.invalidateQueries({ queryKey: ["words"] });
        },
    });
};

export const useDeleteWord = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => WordService.deleteWord(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["words"] });
        },
    });
};

export const useTestWord = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: TestWordDto }) =>
            WordService.testWord(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["word"] });
            queryClient.invalidateQueries({ queryKey: ["learningStats"] });
        },
    });
};

export const useGetWordsByVocabulary = (vocabularyId: string) =>
    useQuery<WordDto[]>({
        queryKey: ["words", "vocabulary", vocabularyId],
        queryFn: () => WordService.getWordsByVocabulary(vocabularyId),
        enabled: !!vocabularyId,
    });

export const useGetWordsByUser = (userId: string) =>
    useQuery<WordDto[]>({
        queryKey: ["words", "user", userId],
        queryFn: () => WordService.getWordsByUser(userId),
        enabled: !!userId,
    });

export const useGetLearningStats = (userId: string) =>
    useQuery<LearningStatsDto>({
        queryKey: ["learningStats", userId],
        queryFn: () => WordService.getLearningStats(userId),
        enabled: !!userId,
    });
