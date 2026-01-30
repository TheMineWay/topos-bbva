import { ActionIcon } from "@mantine/core";
import { useThemeContext } from "../../../providers/theme/theme.context";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../../i18n/translation.enum";

export const ThemeModeSwitch: FC = () => {
	const { t } = useTranslation(TRANSLATIONS.COMMON);
	const { theme, setTheme } = useThemeContext();
	const isLight = theme.mode === "light";

	const onSwitch = useCallback(
		() => setTheme({ ...theme, mode: isLight ? "dark" : "light" }),
		[setTheme, theme, isLight],
	);

	return (
		<ActionIcon
			onClick={onSwitch}
			aria-label={t(`theme.switcher.${isLight ? "dark" : "light"}`)}
			data-testid="theme-mode-switch"
		>
			{isLight ? <IconMoonFilled /> : <IconSunFilled />}
		</ActionIcon>
	);
};
