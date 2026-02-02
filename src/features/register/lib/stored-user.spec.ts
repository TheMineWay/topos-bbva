import { beforeEach, describe, expect, it } from "vitest";
import { getStoredUser } from "./stored-user";
import type { UserInfo } from "providers/user/user.context";
import { createLocalStorageMock } from "../../../test/lib/create-ls-mock";

const localStorageMock = createLocalStorageMock();

describe("getStoredUser()", () => {
	beforeEach(() => {
		Object.defineProperty(globalThis, "localStorage", {
			value: localStorageMock,
			writable: true,
		});

		localStorage.clear();
	});

	it("should return null when no user is stored", () => {
		const stored = getStoredUser();
		expect(stored).toBeNull();
	});

	it("should return the stored user when present", () => {
		const mock: UserInfo = {
			username: "Mole",
		};
		localStorage.setItem("user", JSON.stringify(mock));

		const stored = getStoredUser();
		expect(stored).toEqual(mock);
	});

	it("should return null when stored user is malformed", () => {
		localStorage.setItem("user", '{"username": true}');
		const stored = getStoredUser();
		expect(stored).toBeNull();
	});
});
