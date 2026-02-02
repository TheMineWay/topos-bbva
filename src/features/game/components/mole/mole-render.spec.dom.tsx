import { render } from "vitest-browser-react";
import { MoleRender } from "./mole-render";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TestEssentials } from "../../../../test/components/test-essentials";

const onHit = vi.fn();

const renderComponent = () => {
	return render(
		<TestEssentials>
			<MoleRender onHit={onHit} />
		</TestEssentials>,
	);
};

const getMole = (page: Awaited<ReturnType<typeof renderComponent>>) => {
	return page.getByTestId("mole");
};

describe("<MoleRender/>", () => {
	let page: Awaited<ReturnType<typeof renderComponent>>;

	beforeEach(async () => {
		page = await renderComponent();
	});

	it("should render correctly", async () => {
		const mole = getMole(page);
		expect(mole.query()?.tagName).toBe("BUTTON");
		expect(mole).toBeInTheDocument();
	});

	it("should call onHit when mole is clicked", async () => {
		const mole = getMole(page);
		await mole.click();

		expect(onHit).toHaveBeenCalled();
	});
});
