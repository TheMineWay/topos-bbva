import { Select } from "@mantine/core";
import { useCallback, useMemo } from "react";
import type { Difficulty } from "../../types/difficulty.type";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../../../i18n/translation.enum";
import { GAME_DIFFICULTY_CONFIG } from "../../constants/game-difficulty-config.constant";
import { useGameConfig } from "../../../../providers/game/use-game-config";

const OPTIONS = Object.entries(GAME_DIFFICULTY_CONFIG).map(([mode, value]) => ({
	mode: mode as Difficulty,
	value,
}));
export const GameDifficultySelector: FC = () => {
	const { t } = useTranslation(TRANSLATIONS.GAME);

	const {
		config: { difficulty },
		setConfig,
	} = useGameConfig();

	const options = useMemo(
		() =>
			OPTIONS.map((option) => {
				const modeName = t(`config.difficulty.options.${option.mode}`);
				return {
					value: option.mode,
					label: `${modeName} (${option.value.ms}ms)`,
				};
			}),
		[t],
	);

	const onSelect = useCallback(
		(value: string | null) => {
			if (value) {
				setConfig({ difficulty: value as Difficulty });
			}
		},
		[setConfig],
	);

	return (
		<Select
			w="10rem"
			data={options}
			value={difficulty}
			onChange={onSelect}
			aria-label={t("config.difficulty.Select")}
		/>
	);
};
