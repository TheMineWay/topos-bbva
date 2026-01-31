import { getRandomInt } from "../../../common/random/lib/get-random-int.util";
import type { Hole } from "../types/hole.type";

type Options = {
	// Amount of holes to randomize (how many moles to show)
	amount?: number;
	// Prefer to avoid these holes when randomizing
	avoid?: number[];
};

export const randomizeHoles = (
	availableHolesCount: number,
	{ amount = 1, avoid = [] }: Options = {},
): Hole[] => {
	const availableHoles = Array.from(
		{ length: availableHolesCount },
		(_, i) => i,
	);

	// Remove holes to avoid from available ones
	for (let i = avoid.length - 1; i >= 0; i--) {
		// Do not remove available holes if not enough holes left
		if (availableHoles.length - 1 < amount) break;

		const avoidIdx = availableHoles.indexOf(avoid[i]);
		if (avoidIdx === -1) continue;

		availableHoles.splice(avoidIdx, 1);
	}

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
		multiplier: 1,
	},
});
