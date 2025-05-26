import type { WordDto } from "./word.dto";

export interface TestWordResponse {
    correct: boolean;
    updated: WordDto;
}
