import { useCallback, useState } from "react";

export const useScore = () => {
	const [score, setScore] = useState(0);

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
