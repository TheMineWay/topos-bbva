import { useCallback, useState } from "react";
import { useScore } from "./use-score";
import { useGameTimer } from "./use-game-timer";

type Options = {
	initialSize?: [number, number];
	initialTimerDelay?: number;
};

/**
 * Hook responsible of managing board and game logics
 */
export const useBoard = ({
	initialSize = [3, 3],
	initialTimerDelay,
}: Options = {}) => {
	const scoreManager = useScore();

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
	};
};

/* Types */

export type UseBoard = ReturnType<typeof useBoard>;
