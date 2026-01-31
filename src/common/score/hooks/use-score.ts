import { useCallback, useEffect, useMemo, useState } from "react";
import { getBestScore, setBestScore } from "../lib/score.utils";

type Options = {
	username: string;
	points?: number;
};

export const useScore = ({ username, points = 10 }: Options) => {
	const [score, setScore] = useState(0);
	const [lastBestScore, setLastBestScore] = useState(() => getBestScore());

	useEffect(() => setBestScore(score, username), [score, username]);

	const increment = useCallback(
		(multiplier: number = 1) =>
			setScore((s) => Math.floor(s + points * multiplier)),
		[points],
	);

	const reset = useCallback(() => {
		setScore(0);
		setLastBestScore(() => getBestScore());
	}, []);

	const isBestScore = useMemo(() => {
		const bestScore = lastBestScore?.bestScore ?? 0;
		return score > bestScore;
	}, [score, lastBestScore]);

	return {
		score,
		setScore,

		// API
		increment,
		reset,
		isBestScore,
	};
};

/* Types */

export type UseScore = ReturnType<typeof useScore>;
