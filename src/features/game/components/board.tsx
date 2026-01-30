import type { UseBoard } from "../hooks/use-board";

type Props = {
	manager: UseBoard;
};

export const Board: FC<Props> = ({ manager }) => {
	return <table>BOARD</table>;
};
