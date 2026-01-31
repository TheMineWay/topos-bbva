import z from "zod";

const KEY = "bestScore";

const SCHEMA = z.object({
	bestScore: z.number().min(0),
	username: z.string(),
});

type BestScoreData = z.infer<typeof SCHEMA>;

export const getBestScore = (): BestScoreData | null => {
	const rawBestScore = localStorage.getItem(KEY);
	if (!rawBestScore) return null;

	// Parse data
	try {
		const parsed = SCHEMA.safeParse(JSON.parse(rawBestScore));
		if (!parsed.success) return null;
		return parsed.data;
	} catch {
		return null;
	}
};

export const setBestScore = (score: number, username: string): void => {
	const bestScoreInfo = getBestScore();
	const bestScore = bestScoreInfo?.bestScore ?? 0;

	// Check if it is not the best score
	if (score <= bestScore) return;

	const newBestScore: BestScoreData = {
		bestScore: score,
		username,
	};

	localStorage.setItem(KEY, JSON.stringify(newBestScore));
};
