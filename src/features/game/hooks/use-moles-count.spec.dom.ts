import { beforeEach, describe, expect, it } from "vitest";
import { renderHook } from "vitest-browser-react";
import { useMolesCount } from "./use-moles-count";

const createHook = () => {
	return renderHook(() => useMolesCount());
};

describe("useMolesCount()", () => {
	let hook: Awaited<ReturnType<typeof createHook>>;

	beforeEach(async () => {
		hook = await createHook();
	});

	it("should start with count of 1", async () => {
		expect(hook.result.current.molesCount).toEqual(1);
	});

	it("should increase count up to MAX_MOLES (5)", async () => {
		expect(hook.result.current.molesCount).toEqual(1);

		for (let i = 2; i <= 5; i++) {
			await hook.act(() => hook.result.current.increase());
			expect(hook.result.current.molesCount).toEqual(i);
		}
	});

	it("should decrease count down to 1", async () => {
		expect(hook.result.current.molesCount).toEqual(1);
		for (let i = 0; i < 4; i++) {
			await hook.act(() => hook.result.current.increase());
		}
		expect(hook.result.current.molesCount).toEqual(5);

		for (let i = 4; i >= 1; i--) {
			await hook.act(() => hook.result.current.decrease());
			expect(hook.result.current.molesCount).toEqual(i);
		}
		expect(hook.result.current.molesCount).toEqual(1);
	});

	it("should not allow increase beyond MAX_MOLES", async () => {
		expect(hook.result.current.molesCount).toEqual(1);
		for (let i = 2; i <= 5; i++) {
			await hook.act(() => hook.result.current.increase());
			expect(hook.result.current.molesCount).toEqual(i);
		}

		// Keep increasing
		for (let i = 0; i < 3; i++) {
			await hook.act(() => hook.result.current.increase());
			expect(hook.result.current.molesCount).toEqual(5);
		}
	});

	it("should not allow decrease below 1", async () => {
		expect(hook.result.current.molesCount).toEqual(1);

		for (let i = 0; i < 3; i++) {
			await hook.act(() => hook.result.current.decrease());
			expect(hook.result.current.molesCount).toEqual(1);
		}
	});

	it("should reset to 1", async () => {
		expect(hook.result.current.molesCount).toEqual(1);
		for (let i = 2; i <= 5; i++) {
			await hook.act(() => hook.result.current.increase());
			expect(hook.result.current.molesCount).toEqual(i);
		}

		await hook.act(() => hook.result.current.reset());
		expect(hook.result.current.molesCount).toEqual(1);
	});

	it("should properly calculate canIncrease/canDecrease", async () => {
		expect(hook.result.current.molesCount).toEqual(1);
		expect(hook.result.current.canDecrease).toBe(false);
		expect(hook.result.current.canIncrease).toBe(true);

		// Test middle values
		for (let i = 2; i < 5; i++) {
			await hook.act(() => hook.result.current.increase());
			expect(hook.result.current.molesCount).toEqual(i);
			expect(hook.result.current.canDecrease).toBe(true);
			expect(hook.result.current.canIncrease).toBe(true);
		}

		// Last increase
		await hook.act(() => hook.result.current.increase());
		expect(hook.result.current.molesCount).toEqual(5);
		expect(hook.result.current.canDecrease).toBe(true);
		expect(hook.result.current.canIncrease).toBe(false);
	});
});
