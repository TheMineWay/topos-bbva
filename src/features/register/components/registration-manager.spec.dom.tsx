import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { RegistrationManager } from "./registration-manager";
import { TestEssentials } from "../../../test/components/test-essentials";
import { userEvent } from "vitest/browser";

const renderComponent = async () => {
	const component = render(
		<TestEssentials>
			<RegistrationManager />
		</TestEssentials>,
	);

	const usernameField = (await component).getByTestId("register-username");
	const submitButton = (await component).getByTestId("register-submit");

	expect(usernameField).toBeDefined();
	expect(submitButton).toBeDefined();

	return { component, usernameField, submitButton };
};

describe("<RegistrationManager/>", () => {
	it("should allow register when a valid username is written", async () => {
		const { usernameField, submitButton } = await renderComponent();

		await userEvent.type(usernameField, "Joel");

		expect(submitButton).not.toHaveAttribute("disabled");
	});

	it("should not allow register when an invalid username is written", async () => {
		const { usernameField, submitButton } = await renderComponent();

		await userEvent.type(usernameField, "A");

		expect(submitButton).toHaveAttribute("disabled");
	});
});
