import type { Difficulty } from "../types/difficulty.type";

type Config = {
	ms: number;
	points: number;
};

export const GAME_DIFFICULTY_CONFIG: Record<Difficulty, Config> = {
	easy: { ms: 1000, points: 10 },
	medium: { ms: 750, points: 20 },
	hard: { ms: 500, points: 30 },
};
