import { useMemo } from "react";
import type { UseBoard } from "../hooks/use-board";
import styles from "./board.module.css";
import type { Mole } from "../types/mole.type";

type Props = {
	manager: UseBoard;
};

export const Board: FC<Props> = ({ manager }) => {
	const { size } = manager;

	const matrix = useMemo(
		() => Array.from({ length: size }).map((_, x) => x),
		[size],
	);

	return (
		<div className={styles.board}>
			{matrix.map((id) => (
				<HoleRender key={id} />
			))}
		</div>
	);
};

/* Internal components */

type HoleRenderProps = {
	mole?: Mole;
};

const HoleRender: FC<HoleRenderProps> = () => {
	return <div className={styles.hole}>HOLE</div>;
};

/* Internal utils */
