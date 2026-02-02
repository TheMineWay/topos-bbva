import { beforeEach, describe, expect, it } from "vitest";
import { renderHook } from "vitest-browser-react";
import { useScore } from "./use-score";
import { createLocalStorageMock } from "../../../test/lib/create-ls-mock";

let localStorageMock: ReturnType<typeof createLocalStorageMock>;
const USERNAME_MOCK = "Roxie";

const createHook = () => {
	return renderHook(() => useScore({ username: USERNAME_MOCK }));
};

describe("useScore()", () => {
	let hook: Awaited<ReturnType<typeof createHook>>;

	beforeEach(async () => {
		localStorageMock = createLocalStorageMock();

		Object.defineProperty(globalThis, "localStorage", {
			value: localStorageMock,
			writable: true,
		});
		hook = await createHook();
	});

	it("should start with score 0", async () => {
		expect(hook.result.current.score).toBe(0);
	});

	it("should increment score by points * multiplier", async () => {
		expect(hook.result.current.score).toBe(0);

		for (let i = 1; i <= 5; i++) {
			await hook.act(() => hook.result.current.increment());
			expect(hook.result.current.score).toBe(i * 10);
		}

		// Change multiplier
		const prevScore = hook.result.current.score;
		for (let i = 1; i <= 3; i++) {
			await hook.act(() => hook.result.current.increment(2));
			expect(hook.result.current.score).toBe(prevScore + i * 20);
		}
	});

	it("should reset score to 0", async () => {
		expect(hook.result.current.score).toBe(0);

		await hook.act(() => hook.result.current.increment());
		expect(hook.result.current.score).toBe(10);

		await hook.act(() => hook.result.current.reset());
		expect(hook.result.current.score).toBe(0);
	});

	it("should detect when score is a best score", async () => {
		localStorageMock.setItem(
			"bestScore",
			JSON.stringify({
				username: "Someone",
				bestScore: 50,
			}),
		);

		// This test needs to recreate the hook
		hook = await createHook();

		expect(hook.result.current.isBestScore).toBe(false);

		// Reach 50
		for (let i = 0; i < 5; i++) {
			await hook.act(() => hook.result.current.increment());
			expect(hook.result.current.isBestScore).toBe(false);
		}

		// Reach 60
		await hook.act(() => hook.result.current.increment());
		expect(hook.result.current.score).toBe(60);
		expect(hook.result.current.isBestScore).toBe(true);
	});

	it("should save best score to localStorage on increment", async () => {
		expect(localStorageMock.getItem("bestScore")).toBeNull();

		// Increment to 30
		for (let i = 0; i < 3; i++) {
			await hook.act(() => hook.result.current.increment());
		}

		// Check ls
		const bestScoreData = JSON.parse(localStorageMock.getItem("bestScore"));
		expect(bestScoreData).toEqual({
			username: USERNAME_MOCK,
			bestScore: 30,
		});
	});
});
