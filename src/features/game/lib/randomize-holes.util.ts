import { getRandomInt } from "../../../common/random/lib/get-random-int.util";
import type { Hole } from "../types/hole.type";

type Options = {
	amount?: number;
};

export const randomizeHoles = (
	availableHolesCount: number,
	{ amount = 1 }: Options = {},
): Hole[] => {
	const availableHoles = Array.from(
		{ length: availableHolesCount },
		(_, i) => i,
	);

	const selectedHoles: Set<number> = new Set();

	for (let i = 0; i < amount; i++) {
		if (availableHoles.length === 0) break;

		// Generate random index
		const randomIdx = getRandomInt(availableHoles.length);
		const hole = availableHoles[randomIdx];

		// Select it and remove it from available ones
		selectedHoles.add(hole);
		availableHoles.splice(randomIdx, 1);
	}

	// Construct holes from each selection
	const holes: Hole[] = [...selectedHoles].map(constructHole);

	return holes;
};

/* Internals */

const constructHole = (number: number): Hole => ({
	number,
	mole: {
		points: 1,
	},
});
