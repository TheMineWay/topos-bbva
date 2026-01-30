import { Affix, Flex } from "@mantine/core";
import styles from "./main.layout.module.css";
import { LanguagePicker } from "@common/language/components/language-picker";
import { ThemeModeSwitch } from "@common/theme-mode/components/theme-mode-switch";

type Props = {
	children?: React.ReactNode;
};

export const MainLayout: FC<Props> = ({ children }) => {
	return (
		<>
			<main className={styles.container}>{children}</main>
			<Affix p="lg">
				<Flex gap="xs">
					<ThemeModeSwitch />
					<LanguagePicker />
				</Flex>
			</Affix>
		</>
	);
};
