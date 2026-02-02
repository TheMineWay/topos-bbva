import { beforeEach, describe, expect, it } from "vitest";
import { getBestScore, setBestScore } from "./score.utils";
import { createLocalStorageMock } from "../../../test/lib/create-ls-mock";

const localStorageMock = createLocalStorageMock();

describe("getBestScore()", () => {
	beforeEach(() => {
		Object.defineProperty(globalThis, "localStorage", {
			value: localStorageMock,
			writable: true,
		});

		localStorage.clear();
	});

	describe("should return null", () => {
		it("when there is no best score", () => {
			const bestScore = getBestScore();
			expect(bestScore).toBeNull();
		});

		describe("when the best score data is corrupted because", () => {
			it("JSON does not correspond to expected schema", () => {
				localStorage.setItem(
					"bestScore",
					'{"bestScore": "high", "username": 123}',
				);

				const bestScore = getBestScore();
				expect(bestScore).toBeNull();
			});

			it("JSON is invalid", () => {
				localStorage.setItem("bestScore", "notajson");

				const bestScore = getBestScore();
				expect(bestScore).toBeNull();
			});

			it("the best score is negative", () => {
				const mockData = { bestScore: -100, username: "Poncho" };
				localStorage.setItem("bestScore", JSON.stringify(mockData));

				const bestScore = getBestScore();
				expect(bestScore).toBeNull();
			});
		});
	});

	it("should return the best score data when it is valid", () => {
		const mockData = { bestScore: 200, username: "Naruto" };
		localStorage.setItem("bestScore", JSON.stringify(mockData));

		const bestScore = getBestScore();
		expect(bestScore).toEqual(mockData);
	});
});

describe("setBestScore()", () => {
	beforeEach(() => {
		Object.defineProperty(globalThis, "localStorage", {
			value: localStorageMock,
			writable: true,
		});

		localStorage.clear();
	});

	describe("should set a new best score", () => {
		it("when there is no previous best score", () => {
			const score = 150;
			const username = "Golurk";

			setBestScore(score, username);
			const bestScore = getBestScore();

			expect(bestScore).toEqual({ bestScore: score, username });
		});

		it("when the new score is higher than the previous best score", () => {
			// Set previous best score
			const previousScore = 300;
			const previousUsername = "Eevee";
			setBestScore(previousScore, previousUsername);

			// Check previous best score is set
			let bestScore = getBestScore();
			expect(bestScore).toEqual({
				bestScore: previousScore,
				username: previousUsername,
			});

			// Set new best score
			const newScore = 450;
			const newUsername = "Mewtwo";
			setBestScore(newScore, newUsername);

			// Check new best score
			bestScore = getBestScore();
			expect(bestScore).toEqual({ bestScore: newScore, username: newUsername });
		});
	});

	describe("should not set a new best score", () => {
		it("when the new score is lower than the previous best score", () => {
			// Set previous best score
			const previousScore = 400;
			const previousUsername = "Riko";
			setBestScore(previousScore, previousUsername);

			// Check previous best score is set
			let bestScore = getBestScore();
			expect(bestScore).toEqual({
				bestScore: previousScore,
				username: previousUsername,
			});

			// Try to set a lower score
			const newScore = 250;
			const newUsername = "Reg";
			setBestScore(newScore, newUsername);

			// Check best score remains unchanged
			bestScore = getBestScore();
			expect(bestScore).toEqual({
				bestScore: previousScore,
				username: previousUsername,
			});
		});
	});
});
