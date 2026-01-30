import { ActionIcon } from "@mantine/core";
import { useThemeContext } from "@providers/theme/theme.context";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { useCallback } from "react";

export const ThemeModeSwitch: FC = () => {
	const { theme, setTheme } = useThemeContext();
	const isLight = theme.mode === "light";

	const onSwitch = useCallback(
		() => setTheme({ ...theme, mode: isLight ? "dark" : "light" }),
		[setTheme, theme, isLight],
	);

	return (
		<ActionIcon onClick={onSwitch}>
			{isLight ? <IconMoonFilled /> : <IconSunFilled />}
		</ActionIcon>
	);
};
