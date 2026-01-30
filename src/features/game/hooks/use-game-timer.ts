import { useEffect } from "react";

type Options = {
	tickDelay?: number; // In milliseconds
	onTick?: CallableFunction;
};

export const useGameTimer = ({ tickDelay = 1000, onTick }: Options = {}) => {
	useEffect(() => {
		const unsubscribe = setInterval(() => onTick?.(), tickDelay);
		return () => clearInterval(unsubscribe);
	}, [onTick, tickDelay]);
};
