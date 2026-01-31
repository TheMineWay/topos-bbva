import { useCallback, useState } from "react";
import { useScore } from "./use-score";
import { useGameTimer } from "./use-game-timer";
import type { Hole } from "../types/hole.type";
import { GAME_CONSTANTS } from "../constants/game.constants";

type Options = {
	initialSize?: number;
	initialTimerDelay?: number;
};

/**
 * Hook responsible of managing board and game logics
 */
export const useBoard = ({
	initialSize = 9,
	initialTimerDelay,
}: Options = {}) => {
	const scoreManager = useScore();

	// #region Moles

	const [holes, setHoles] = useState<Hole[]>([]);

	const deleteMoleAt = useCallback((idx: number) => {
		setHoles((currentMoles) =>
			currentMoles.filter((hole) => hole.number !== idx),
		);
	}, []);

	const hitMoleAt = useCallback(
		(idx: number) => {
			const hole = holes.find((hole) => hole.number === idx);
			if (!hole) return;

			navigator?.vibrate?.(GAME_CONSTANTS.vibrationIntensity);
			scoreManager.increment(hole.mole.points);
			deleteMoleAt(idx);
		},
		[deleteMoleAt, holes, scoreManager],
	);

	// #endregion

	// #region Board

	const [size, setSize] = useState(initialSize);

	// #endregion

	// #region Play State

	const [isPlaying, setIsPlaying] = useState(false);

	const play = useCallback(() => setIsPlaying(true), []);
	const stop = useCallback(() => setIsPlaying(false), []);

	// #endregion

	// #region Timer

	const [timerTickDelay, setTimerTickDelay] = useState(initialTimerDelay);
	useGameTimer({ tickDelay: timerTickDelay });

	// #endregion

	return {
		// Managers
		scoreManager,

		// Board API
		size,
		setSize,

		// Play API
		isPlaying,
		play,
		stop,

		// Timer API
		timerTickDelay,
		setTimerTickDelay,

		// Moles API
		holes,
		setHoles,
		hitMoleAt,
	};
};

/* Types */

export type UseBoard = ReturnType<typeof useBoard>;
