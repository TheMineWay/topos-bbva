import { describe, expect, it, vi } from "vitest";
import type { Hole } from "../types/hole.type";
import type { Mole } from "../types/mole.type";
import { randomizeHoles } from "./randomize-holes.util";

type Scenario = {
	availableHolesCount?: number; // 9
	amount?: number; // 1
	randomValues: number[];
	expectedHoles: Hole[];
};

const DEF_MOLE: Mole = {
	points: 1,
};

const SCENARIOS: Scenario[] = [
	{
		randomValues: [],
		expectedHoles: [
			{
				number: 0,
				mole: DEF_MOLE,
			},
		],
	},
];

vi.mock("../../../common/random/lib/get-random-int.util", () => ({
	getRandomInt: () => 0,
}));

describe("randomizeHoles()", () => {
	describe("should return randomized list of holes", () => {
		it.each(
			SCENARIOS.map((scenario, idx) => ({ scenario, idx: idx.toString() })),
		)("in scenario $idx", ({ scenario }) => {
			// Test each scenario
			const { availableHolesCount = 9, amount = 1 } = scenario;

			const holes = randomizeHoles(availableHolesCount, { amount });
			expect(holes).toEqual(scenario.expectedHoles);
		});
	});
});
