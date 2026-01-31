import { useMemo } from "react";
import type { UseBoard } from "../hooks/use-board";
import styles from "./board.module.css";
import type { Mole } from "../types/mole.type";
import { MoleRender } from "./mole/mole-render";

type Props = {
	manager: UseBoard;
};

export const Board: FC<Props> = ({ manager }) => {
	const { size, moles } = manager;

	const matrix = useMemo(
		() =>
			Array.from({ length: size }).map((_, number) => {
				return {
					number,
					hole: moles.find((_, index) => index === number),
				};
			}),
		[size, moles],
	);

	return (
		<div className={styles.board}>
			{matrix.map(({ number, hole }) => (
				<HoleRender key={number} number={number} mole={hole?.mole} />
			))}
		</div>
	);
};

/* Internal components */

type HoleRenderProps = {
	mole?: Mole;
	number: number;
	onHit?: CallableFunction;
};

const HoleRender: FC<HoleRenderProps> = ({ number, mole, onHit }) => {
	return (
		<div className={styles.hole} data-testid={`hole-${number}`}>
			{mole && <MoleRender onHit={onHit} />}
		</div>
	);
};
