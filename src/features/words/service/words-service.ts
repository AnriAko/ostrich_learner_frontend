import api from "../../../shared/api/axios-instance";
import type { CreateWordDto } from "../features/add-words/dto/create-word.dto";
import type { UpdateWordDto } from "../dto/update-word.dto";
import type { TestWordDto } from "../dto/test-word.dto";
import type { WordDto } from "../dto/word.dto";
import type { LearningStatsDto } from "../dto/learning-stats.dto";

const ROUTE_URL = "word";

export class WordService {
    static async createWord(data: CreateWordDto): Promise<WordDto> {
        const response = await api.post(`${ROUTE_URL}`, data);
        return response.data;
    }

    static async getWordById(id: string): Promise<WordDto | null> {
        const response = await api.get(`${ROUTE_URL}/${id}`);
        return response.data;
    }

    static async updateWord(id: string, data: UpdateWordDto): Promise<WordDto> {
        const response = await api.patch(`${ROUTE_URL}/${id}`, data);
        return response.data;
    }

    static async deleteWord(id: string): Promise<void> {
        const response = await api.delete(`${ROUTE_URL}/${id}`);
        return response.data;
    }

    static async testWord(
        id: string,
        data: TestWordDto
    ): Promise<{ correct: boolean; updated: WordDto }> {
        const response = await api.post(`${ROUTE_URL}/${id}/test`, data);
        return response.data;
    }

    static async getWordsByVocabulary(
        vocabularyId: string
    ): Promise<WordDto[]> {
        const response = await api.get(
            `${ROUTE_URL}/vocabulary/${vocabularyId}`
        );
        return response.data;
    }

    static async getWordsByUser(userId: string): Promise<WordDto[]> {
        const response = await api.get(`${ROUTE_URL}/user/${userId}`);
        return response.data;
    }

    static async getLearningStats(userId: string): Promise<LearningStatsDto> {
        const response = await api.get(
            `${ROUTE_URL}/user/${userId}/learning-stats`
        );
        return response.data;
    }

    static async getAvailableForTestWords(
        vocabularyId: string
    ): Promise<WordDto[]> {
        const response = await api.get(
            `${ROUTE_URL}/available-for-test/${vocabularyId}`
        );
        return response.data;
    }

    static async getWordsForRepetition(
        vocabularyId: string
    ): Promise<WordDto[]> {
        const response = await api.get(
            `${ROUTE_URL}/for-repetition/${vocabularyId}`
        );
        return response.data;
    }
}
