import api from "../../../shared/api/axios-instance";
import type { CreateWordDto } from "../components/add-words/dto/create-word.dto";
import type { UpdateWordDto } from "../dto/update-word.dto";
import type { TestWordDto } from "../dto/test-word.dto";
import type { WordDto } from "../dto/word.dto";
import type { LearningStatsDto } from "../dto/learning-stats.dto";
import type { TestWordResponse } from "../dto/test-word-response.dto";
import { WordFilterDto } from "../components/word-management/dto/word-filter.dto";

const ROUTE_URL = "word";

interface FilteredWordsResponse {
    data: WordDto[];
    total: number;
}

export class WordService {
    static async createWord(data: CreateWordDto): Promise<WordDto> {
        const { data: word } = await api.post(ROUTE_URL, data);
        return word;
    }

    static async getWordById(id: string): Promise<WordDto | null> {
        const { data: word } = await api.get(`${ROUTE_URL}/${id}`);
        return word;
    }

    static async updateWord(id: string, data: UpdateWordDto): Promise<WordDto> {
        const { data: word } = await api.patch(`${ROUTE_URL}/${id}`, data);
        return word;
    }

    static async deleteWord(id: string): Promise<void> {
        await api.delete(`${ROUTE_URL}/${id}`);
    }

    static async testWord(
        id: string,
        data: TestWordDto
    ): Promise<TestWordResponse> {
        const { data: result } = await api.post(
            `${ROUTE_URL}/${id}/test`,
            data
        );
        return result;
    }

    static async getWordsByVocabulary(
        vocabularyId: string
    ): Promise<WordDto[]> {
        const { data: words } = await api.get(
            `${ROUTE_URL}/vocabulary/${vocabularyId}`
        );
        return words;
    }

    static async getWordsByUser(userId: string): Promise<WordDto[]> {
        const { data: words } = await api.get(`${ROUTE_URL}/user/${userId}`);
        return words;
    }

    static async getLearningStats(userId: string): Promise<LearningStatsDto> {
        const { data: stats } = await api.get(
            `${ROUTE_URL}/user/${userId}/learning-stats`
        );
        return stats;
    }

    static async getWordsForRepetition(userId: string): Promise<WordDto[]> {
        const { data: words } = await api.get(
            `${ROUTE_URL}/available-for-repetition/${userId}`
        );
        return words;
    }

    static async getAvailableForLearning(userId: string): Promise<WordDto[]> {
        const { data: words } = await api.get(
            `${ROUTE_URL}/available-for-learning/${userId}`
        );
        return words;
    }
    static async getFilteredWords(
        filters: WordFilterDto
    ): Promise<FilteredWordsResponse> {
        const allowedKeys = Object.keys(filters) as (keyof WordFilterDto)[];
        const params: Record<string, string | number | boolean> = {};

        for (const key of allowedKeys) {
            const value = filters[key];
            if (value !== undefined && value !== null) {
                params[key] = value as string | number | boolean;
            }
        }

        const { data } = await api.get<FilteredWordsResponse>(
            `${ROUTE_URL}/filtered`,
            { params }
        );
        return data;
    }
}
