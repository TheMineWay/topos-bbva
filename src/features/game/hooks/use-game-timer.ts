import { addMilliseconds, isAfter } from "date-fns";
import { useEffect, useState } from "react";

const INTERVAL = 50;

type Options = {
	tickDelay?: number; // In milliseconds
	onTick?: CallableFunction;
};

export const useGameTimer = ({ tickDelay = 1000, onTick }: Options = {}) => {
	const [lastCountStart, setLastCountStart] = useState<Date>(new Date());

	useEffect(() => {
		const unsubscribe = setInterval(() => {
			const now = new Date();
			const targetTime = addMilliseconds(lastCountStart, tickDelay);
			if (isAfter(now, targetTime)) {
				onTick?.();
				setLastCountStart(now);
			}
		}, INTERVAL);
		return () => clearInterval(unsubscribe);
	}, [onTick, lastCountStart, tickDelay]);
};

/**
 * DEV NOTE
 *
 * Could not create an interval of "tickDelay". That created a bug. As the useEffect was recalculated, it was like the
 * timer was reset.
 * I decided to store the last time when the timer started. Then I check every X ms (INTERVAL) if we reached the target time.
 * This approach allows me to update the tickDelay dynamically without losing time.
 */
