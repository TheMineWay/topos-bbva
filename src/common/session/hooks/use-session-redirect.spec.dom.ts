import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook } from "vitest-browser-react";
import { useSessionRedirect } from "./use-session-redirect";
import type { UserInfo } from "../../../providers/user/user.context";

// State
let mockUser: UserInfo | null = null;
let mockPathname = "/";
const mockNavigate = vi.fn();

vi.mock("../../../providers/user/user.context", () => ({
	useUserContext: () => ({
		user: mockUser,
		setUser: vi.fn(),
	}),
}));

vi.mock("@tanstack/react-router", () => ({
	useNavigate: () => mockNavigate,
	useRouterState: () => ({
		location: {
			pathname: mockPathname,
		},
	}),
}));

describe("useSessionRedirect()", () => {
	beforeEach(() => {
		mockNavigate.mockClear();
		mockUser = null;
		mockPathname = "/";
	});

	describe("when accessing the home page", () => {
		it("should redirect to /game if there is a session", async () => {
			mockUser = { username: "John" };
			mockPathname = "/";

			await renderHook(() => useSessionRedirect());

			expect(mockNavigate).toHaveBeenCalledWith({ to: "/game" });
		});

		it("should stay on home if there is no session", async () => {
			mockUser = null;
			mockPathname = "/";

			await renderHook(() => useSessionRedirect());

			expect(mockNavigate).not.toHaveBeenCalled();
		});
	});

	describe("when accessing the game page", () => {
		it("should stay on /game if there is a session", async () => {
			mockUser = { username: "TestUser" };
			mockPathname = "/game";

			await renderHook(() => useSessionRedirect());

			expect(mockNavigate).not.toHaveBeenCalled();
		});

		it("should redirect to home if there is no session", async () => {
			mockUser = null;
			mockPathname = "/game";

			await renderHook(() => useSessionRedirect());

			expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
		});
	});
});
