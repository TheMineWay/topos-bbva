import { useCallback } from "react";
import { useGameConfigContext, type GameConfig } from "./game-config.context";

export const useGameConfig = () => {
	const { config, setConfig: setConfigContext } = useGameConfigContext();

	const setConfig = useCallback(
		(newConfig: Partial<GameConfig>) => {
			setConfigContext((prevConfig) => ({ ...prevConfig, ...newConfig }));
		},
		[setConfigContext],
	);

	return { config, setConfig };
};
