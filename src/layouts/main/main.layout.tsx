import styles from "./main.layout.module.css";

type Props = {
	children?: React.ReactNode;
};

export const MainLayout: FC<Props> = ({ children }) => {
	return <main className={styles.container}>{children}</main>;
};
