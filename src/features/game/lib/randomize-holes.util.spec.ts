import { describe, expect, it, vi } from "vitest";
import type { Hole } from "../types/hole.type";
import type { Mole } from "../types/mole.type";
import { randomizeHoles } from "./randomize-holes.util";

type Scenario = {
	name: string;
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
		name: "single hole selection at start",
		randomValues: [0],
		expectedHoles: [
			{
				number: 0,
				mole: DEF_MOLE,
			},
		],
	},
	{
		name: "single hole selection in the middle",
		randomValues: [3],
		expectedHoles: [
			{
				number: 3,
				mole: DEF_MOLE,
			},
		],
	},
	{
		name: "multiple hole selection",
		amount: 3,
		randomValues: [2, 0, 2],
		expectedHoles: [
			{
				number: 2,
				mole: DEF_MOLE,
			},
			{
				number: 0,
				mole: DEF_MOLE,
			},
			{
				number: 4,
				mole: DEF_MOLE,
			},
		],
	},
	{
		name: "requesting more holes than available",
		amount: 3,
		availableHolesCount: 2,
		randomValues: [0, 0],
		expectedHoles: [
			{
				number: 0,
				mole: DEF_MOLE,
			},
			{
				number: 1,
				mole: DEF_MOLE,
			},
		],
	},
];

let randomReturnValues: number[] = [];

vi.mock("../../../common/random/lib/get-random-int.util", () => ({
	getRandomInt: () => {
		return randomReturnValues.shift();
	},
}));

describe("randomizeHoles()", () => {
	describe("should return randomized list of holes when", () => {
		it.each(SCENARIOS)("$name", (scenario) => {
			randomReturnValues = [...scenario.randomValues];

			// Test each scenario
			const { availableHolesCount = 9, amount = 1 } = scenario;

			const holes = randomizeHoles(availableHolesCount, { amount });
			expect(holes).toEqual(scenario.expectedHoles);
		});
	});
});
