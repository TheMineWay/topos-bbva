import { addMilliseconds, isAfter } from "date-fns";
import { useEffect, useState } from "react";

const INTERVAL = 50;

type Options = {
	tickDelay?: number; // In milliseconds
	onTick?: CallableFunction;
};

export const useGameTimer = ({ tickDelay = 1000, onTick }: Options = {}) => {
	const [targetTime, setTargetTime] = useState<Date>(
		addMilliseconds(new Date(), tickDelay),
	);

	useEffect(() => {
		const unsubscribe = setInterval(() => {
			const now = new Date();
			if (isAfter(now, targetTime)) {
				onTick?.();
				setTargetTime(addMilliseconds(now, tickDelay));
			}
		}, INTERVAL);
		return () => clearInterval(unsubscribe);
	}, [onTick, tickDelay, targetTime]);
};

/**
 * DEV NOTE
 *
 * Could not create an interval of "tickDelay". That created a bug. As the useEffect was recalculated, it was like the
 * timer was reseted.
 * I decided to store the target time and check every X time (INTERVAL).
 */
