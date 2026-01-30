import { Affix } from "@mantine/core";
import styles from "./main.layout.module.css";
import { LanguagePicker } from "@common/language/components/language-picker";

type Props = {
	children?: React.ReactNode;
};

export const MainLayout: FC<Props> = ({ children }) => {
	return (
		<>
			<main className={styles.container}>{children}</main>
			<Affix p="lg">
				<LanguagePicker />
			</Affix>
		</>
	);
};
