import { useCallback, useMemo, useState } from "react";
import { useScore } from "./use-score";
import { useGameTimer } from "./use-game-timer";
import type { Hole } from "../types/hole.type";
import { GAME_CONSTANTS } from "../constants/game.constants";
import { randomizeHoles } from "../lib/randomize-holes.util";
import { useUser } from "../../../providers/user/use-user";
import { useGameConfig } from "../../../providers/game/use-game-config";
import { GAME_DIFFICULTY_CONFIG } from "../constants/game-difficulty-config.constant";

type Options = {
	initialSize?: number;
	molesCount?: number;
};

/**
 * Hook responsible of managing board and game logics
 */
export const useBoard = ({ initialSize = 9, molesCount = 1 }: Options = {}) => {
	const { user } = useUser();
	const {
		config: { difficulty },
	} = useGameConfig();

	const scoreManager = useScore({ username: user.username });

	// #region Board

	const [size, setSize] = useState(initialSize);

	// #endregion

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

	const nextHoles = useCallback(
		() =>
			setHoles(
				randomizeHoles(size, {
					amount: molesCount,
					avoid: holes.map((hole) => hole.number),
				}),
			),
		[size, holes, molesCount],
	);

	// #endregion

	// #region Play State

	const [isPlaying, setIsPlaying] = useState(false);

	const play = useCallback(() => {
		setIsPlaying(true);
		nextHoles();
		scoreManager.reset();
	}, [nextHoles, scoreManager]);

	const stop = useCallback(() => {
		setIsPlaying(false);
		setHoles([]);
	}, []);

	// #endregion

	// #region Timer

	const timerTickDelay = useMemo(
		() => GAME_DIFFICULTY_CONFIG[difficulty].ms,
		[difficulty],
	);

	useGameTimer({
		tickDelay: timerTickDelay,
		onTick: nextHoles,
		enabled: isPlaying,
	});

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

		// Moles API
		holes,
		setHoles,
		hitMoleAt,
	};
};

/* Types */

export type UseBoard = ReturnType<typeof useBoard>;
