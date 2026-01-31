import { useMemo, useState } from "react";
import { type GameConfig, GameConfigContext } from "./game-config.context";

const DEFAULT_CONFIG: GameConfig = {
	difficulty: "easy",
};

type Props = {
	children: React.ReactNode;
};

export const GameConfigProvider: FC<Props> = ({ children }) => {
	const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG);

	const provide = useMemo(
		() => ({
			config,
			setConfig,
		}),
		[config],
	);

	return (
		<GameConfigContext.Provider value={provide}>
			{children}
		</GameConfigContext.Provider>
	);
};
