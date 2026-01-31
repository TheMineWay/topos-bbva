import { useCallback, useState } from "react";

const MAX_MOLES = 5;

export const useMolesCount = () => {
	const [molesCount, setMolesCount] = useState(1);

	const increase = useCallback(() => {
		setMolesCount((count) => Math.min(MAX_MOLES, count + 1));
	}, []);

	const decrease = useCallback(() => {
		setMolesCount((count) => Math.max(1, count - 1));
	}, []);

	const reset = useCallback(() => {
		setMolesCount(1);
	}, []);

	// Restrictions
	const canIncrease = molesCount < MAX_MOLES;
	const canDecrease = molesCount > 1;

	return {
		molesCount,

		// API
		increase,
		decrease,
		reset,

		// Restrictions
		canIncrease,
		canDecrease,
	};
};

export type UseMolesCount = ReturnType<typeof useMolesCount>;
