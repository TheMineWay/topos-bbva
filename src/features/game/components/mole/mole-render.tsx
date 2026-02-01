import styles from "./mole-render.module.css";
import { MoleAvatar } from "../../../../common/mole/components/mole-avatar";

type Props = {
	onHit?: CallableFunction;
};

export const MoleRender: FC<Props> = ({ onHit }) => {
	return (
		<button
			onClick={() => onHit?.()}
			type="button"
			className={styles.mole}
			data-testid="mole"
		>
			<MoleAvatar />
		</button>
	);
};
