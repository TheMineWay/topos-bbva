import { useBoard } from "../hooks/use-board";
import { Board } from "./board";

export const Game: FC = () => {
	const manager = useBoard();

	return <Board manager={manager} />;
};
