import { Button } from "@mantine/core";
import { useBoard } from "../hooks/use-board";
import { Board } from "./board";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../../i18n/translation.enum";
import { useCallback } from "react";
import styles from "./game.module.css";

export const Game: FC = () => {
	const { t } = useTranslation(TRANSLATIONS.GAME);
	const manager = useBoard();

	const onActionClick = useCallback(() => {
		if (manager.isPlaying) manager.stop();
		else manager.play();
	}, [manager.isPlaying, manager.play, manager.stop]);

	return (
		<div className={styles.root}>
			<Board manager={manager} />

			<Button
				size="xl"
				onClick={onActionClick}
				className={styles["action-button"]}
				data-testid={manager.isPlaying ? "stop-button" : "play-button"}
			>
				{t(`actions.${manager.isPlaying ? "Stop" : "Play"}`)}
			</Button>
		</div>
	);
};
