import { useMemo, useState } from "react";
import { ThemeContext, type ThemeInfo } from "./theme.context";
import { createTheme, MantineProvider } from "@mantine/core";

type Props = {
	children: React.ReactNode;
};

const DEFAULT_THEME: ThemeInfo = {
	mode: "light",
};

export const ThemeProvider: FC<Props> = ({ children }) => {
	const [theme, setTheme] = useState<ThemeInfo>(DEFAULT_THEME);

	const context = useMemo(() => ({ theme, setTheme }), [theme]);
	const mantineTheme = createTheme({
		primaryShade: 8,
	});

	return (
		<ThemeContext.Provider value={context}>
			<MantineProvider theme={mantineTheme} forceColorScheme={theme.mode}>
				{children}
			</MantineProvider>
		</ThemeContext.Provider>
	);
};
