import { describe, expect, it, vi } from "vitest";
import { cleanup, render } from "vitest-browser-react";
import { TestEssentials } from "../../../test/components/test-essentials";
import { Board } from "./board";
import type { UseBoard } from "../hooks/use-board";
import type { UseScore } from "../../../common/score/hooks/use-score";

const mockUseBoard = (): UseBoard => {
	return {
		size: 6,
		scoreManager: {} as UseScore,
		setSize: vi.fn(),
		isPlaying: false,
		play: vi.fn(),
		stop: vi.fn(),
		holes: [],
		setHoles: vi.fn(),
		hitMoleAt: vi.fn(),
	};
};

const renderComponent = async (manager: UseBoard) => {
	await cleanup();

	const component = await render(
		<TestEssentials>
			<Board manager={manager} />
		</TestEssentials>,
	);

	return component;
};

describe("<Board/>", () => {
	it("should render holes based on the manager size", async () => {
		const manager = mockUseBoard();

		// Render 9 variants of boards
		for (let i = 1; i <= 9; i++) {
			const managerMock = { ...manager, size: i };
			const component = await renderComponent(managerMock);

			const ids = Array.from({ length: i }).map((_, index) => `hole-${index}`);
			const holes = ids.map((id) => component.getByTestId(id));

			expect(holes.length).toBe(i);
			for (const hole of holes) {
				expect(hole).toBeVisible();
			}
		}
	});
});
