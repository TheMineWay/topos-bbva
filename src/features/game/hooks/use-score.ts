import { useCallback, useEffect, useState } from "react";
import { setBestScore } from "../lib/score.utils";

type Options = {
	username: string;
};

export const useScore = ({ username }: Options) => {
	const [score, setScore] = useState(0);

	useEffect(() => setBestScore(score, username), [score, username]);

	const increment = useCallback(
		(increment: number = 1) => setScore((s) => s + increment),
		[],
	);

	const reset = useCallback(() => setScore(0), []);

	return {
		score,
		setScore,

		// API
		increment,
		reset,
	};
};

/* Types */

export type UseScore = ReturnType<typeof useScore>;
