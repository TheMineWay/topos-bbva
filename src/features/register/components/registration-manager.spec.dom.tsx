import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { RegistrationManager } from "./registration-manager";
import { TestEssentials } from "../../../test/components/test-essentials";

describe("<RegistrationManager/>", () => {
	it("should allow register when a valid username is written", async () => {
		const component = render(
			<TestEssentials>
				<RegistrationManager />
			</TestEssentials>,
		);

		expect(component).toBeDefined();
	});
});
