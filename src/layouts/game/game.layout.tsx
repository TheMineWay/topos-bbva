import { Paper } from "@mantine/core";
import styles from "./game.layout.module.css";

type Props = {
	children: React.ReactNode;
};

export const GameLayout: FC<Props> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Paper className={styles.header}></Paper>
			<div className={styles.content}>{children}</div>
		</div>
	);
};
