import { renderHook } from "vitest-browser-react";
import { useBoard } from "./use-board";
import { beforeEach, describe, expect, it, vi } from "vitest";

// #region Mocks

vi.mock("../../../providers/user/use-user.ts", () => {
	return {
		useUser: vi.fn().mockReturnValue({
			user: {
				username: "Kelly",
			},
		}),
	};
});

vi.mock("../../../providers/game/use-game-config.ts", () => {
	return {
		useGameConfig: vi.fn().mockReturnValue({
			config: { difficulty: "easy" },
		}),
	};
});

// #endregion

const createHook = () => {
	return renderHook(() => useBoard());
};

describe("useBoard()", () => {
	let hook: Awaited<ReturnType<typeof createHook>>;

	beforeEach(async () => {
		hook = await createHook();
	});

	it("should start with default start values", async () => {
		const {
			scoreManager: { score },
			size,
			isPlaying,
		} = hook.result.current;

		expect(score).toBe(0);
		expect(size).toBe(9);
		expect(isPlaying).toBe(false);
	});

	it("should change isPlaying when play() is called", async () => {
		const { play } = hook.result.current;
		expect(hook.result.current.isPlaying).toBe(false);

		await hook.act(() => play());
		expect(hook.result.current.isPlaying).toBe(true);
	});

	it("should change isPlaying when stop() is called", async () => {
		const { play, stop } = hook.result.current;
		expect(hook.result.current.isPlaying).toBe(false);

		await hook.act(() => play());
		expect(hook.result.current.isPlaying).toBe(true);

		await hook.act(() => stop());
		expect(hook.result.current.isPlaying).toBe(false);
	});

	it("should increase score if a mole is hit", async () => {
		await hook.act(() => hook.result.current.play());

		expect(hook.result.current.isPlaying).toBe(true);
		expect(hook.result.current.holes).toHaveLength(1);

		// Pick hole and hit mole
		const hole = hook.result.current.holes[0];
		await hook.act(() => hook.result.current.hitMoleAt(hole.number));

		expect(hook.result.current.scoreManager.score).toBe(
			hole.mole.multiplier * 10,
		);
	});
});
