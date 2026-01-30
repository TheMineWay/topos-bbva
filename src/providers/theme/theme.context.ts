import { createContext, useContext } from "react";

export type ThemeInfo = {
	mode: "light" | "dark";
};

type ContextType = {
	theme: ThemeInfo;
	setTheme: (theme: ThemeInfo) => void;
};

// biome-ignore lint/style/noNonNullAssertion: context will never be used without a default value
export const ThemeContext = createContext<ContextType>(null!);

export const useThemeContext = () => {
	const context = useContext(ThemeContext);

	if (!context) throw new Error("Missing ThemeContext");

	return context;
};
