import { AppShell, Text } from "@mantine/core";
import styles from "./game.layout.module.css";
import { useUser } from "../../providers/user/use-user";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../i18n/translation.enum";

type Props = {
	children: React.ReactNode;
};

export const GameLayout: FC<Props> = ({ children }) => {
	const { t } = useTranslation(TRANSLATIONS.GAME);
	const { user } = useUser();

	return (
		<AppShell className={styles.layout}>
			<AppShell.Header className={styles.header}>
				<Text>{t("layout.Greeting", { name: user?.username })}</Text>
			</AppShell.Header>

			{/* Content */}
			<div className={styles.content}>{children}</div>
		</AppShell>
	);
};
