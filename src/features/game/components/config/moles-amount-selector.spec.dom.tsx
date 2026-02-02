import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { TestEssentials } from "../../../../test/components/test-essentials";
import { MolesAmountSelector } from "./moles-amount-selector";
import type { UseMolesCount } from "../../hooks/use-moles-count";

const createManagerMock = (): UseMolesCount => ({
	molesCount: 1,
	// No need to test limits, this is covered in its own test. This is the simplest mock.
	increase: vi.fn().mockImplementation(() => {}),
	decrease: vi.fn(),
	reset: vi.fn(),
	canIncrease: true,
	canDecrease: false,
});

const renderComponent = (mock: UseMolesCount) => {
	return render(
		<TestEssentials>
			<MolesAmountSelector manager={mock} />
		</TestEssentials>,
	);
};

describe("<MolesAmountSelector/>", () => {
	it("should increase moles count on increase click", async () => {
		const managerMock = createManagerMock();
		const component = await renderComponent(managerMock);

		// Check that can increase
		const increaseButton = component.getByTestId("increase-moles-button");
		await increaseButton.click();

		expect(managerMock.increase).toHaveBeenCalled();
	});

	it("should decrease moles count on decrease click", async () => {
		const managerMock = createManagerMock();
		managerMock.canDecrease = true;
		const component = await renderComponent(managerMock);

		// Check that can decrease
		const decreaseButton = component.getByTestId("decrease-moles-button");
		await decreaseButton.click();

		expect(managerMock.decrease).toHaveBeenCalled();
	});

	describe("should disable", () => {
		it("increase when cannot increase", async () => {
			const managerMock = createManagerMock();
			managerMock.canIncrease = false;
			const component = await renderComponent(managerMock);

			const increaseButton = component.getByTestId("increase-moles-button");
			expect(increaseButton).toBeDisabled();
		});

		it("decrease when cannot decrease", async () => {
			const managerMock = createManagerMock();
			managerMock.canDecrease = false;
			const component = await renderComponent(managerMock);

			const decreaseButton = component.getByTestId("decrease-moles-button");
			expect(decreaseButton).toBeDisabled();
		});
	});

	it("should indicate current moles count", async () => {
		const managerMock = createManagerMock();
		managerMock.molesCount = 5;
		const component = await renderComponent(managerMock);

		const countDisplay = component.getByTestId("moles-count-display");
		expect(countDisplay).toHaveTextContent("x5");
	});
});
