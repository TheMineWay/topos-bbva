import { describe, it } from "vitest";
import { render } from "vitest-browser-react";
import { RegistrationManager } from "./registration-manager";

describe("<RegistrationManager/>", () => {
	it("should allow register when a valid username is written", async () => {
		const component = render(<RegistrationManager />);
	});
});
