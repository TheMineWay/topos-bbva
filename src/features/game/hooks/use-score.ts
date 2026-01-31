import { useCallback, useEffect, useMemo, useState } from "react";
import { getBestScore, setBestScore } from "../lib/score.utils";

type Options = {
	username: string;
};

export const useScore = ({ username }: Options) => {
	const [score, setScore] = useState(0);
	const [lastBestScore, setLastBestScore] = useState(() => getBestScore());

	useEffect(() => setBestScore(score, username), [score, username]);

	const increment = useCallback(
		(increment: number = 1) => setScore((s) => s + increment),
		[],
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
