import { Button } from "@mantine/core";
import { useBoard } from "../hooks/use-board";
import { Board } from "./board";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../../i18n/translation.enum";
import { useCallback } from "react";
import styles from "./game.module.css";
import {
	IconPlayerPlayFilled,
	IconPlayerStopFilled,
} from "@tabler/icons-react";
import { Score } from "../../../common/score/components/score";
import { useMolesCount } from "../hooks/use-moles-count";
import { MolesAmountSelector } from "./config/moles-amount-selector";

export const Game: FC = () => {
	const { t } = useTranslation(TRANSLATIONS.GAME);

	const molesAmountManager = useMolesCount();

	const manager = useBoard({ molesCount: molesAmountManager.molesCount });

	const onActionClick = useCallback(() => {
		if (manager.isPlaying) manager.stop();
		else manager.play();
	}, [manager.isPlaying, manager.play, manager.stop]);

	return (
		<div className={styles.root}>
			<Score manager={manager.scoreManager} />

			<Board manager={manager} />

			{/* Actions */}
			<Button
				size="lg"
				onClick={onActionClick}
				className={styles["action-button"]}
				data-testid={manager.isPlaying ? "stop-button" : "play-button"}
				leftSection={
					manager.isPlaying ? (
						<IconPlayerStopFilled />
					) : (
						<IconPlayerPlayFilled />
					)
				}
			>
				{t(`actions.${manager.isPlaying ? "Stop" : "Play"}`)}
			</Button>
			<MolesAmountSelector manager={molesAmountManager} />
		</div>
	);
};
