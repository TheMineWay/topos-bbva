import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
} from "react";
import type { Difficulty } from "../../features/game/types/difficulty.type";

export interface GameConfig {
	difficulty: Difficulty;
}

type Context = {
	config: GameConfig;
	setConfig: Dispatch<SetStateAction<GameConfig>>;
};

// biome-ignore lint/style/noNonNullAssertion: there will be always a context
export const GameConfigContext = createContext<Context>(null!);

export const useGameConfigContext = () => {
	const context = useContext(GameConfigContext);

	if (!context) throw new Error("No game config context");

	return context;
};
