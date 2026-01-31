import { ActionIcon, AppShell, Group, Text } from "@mantine/core";
import styles from "./game.layout.module.css";
import { useUser } from "../../providers/user/use-user";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../i18n/translation.enum";
import { IconLogout2 } from "@tabler/icons-react";
import { useCallback } from "react";

type Props = {
	children: React.ReactNode;
};

export const GameLayout: FC<Props> = ({ children }) => {
	const { t } = useTranslation(TRANSLATIONS.GAME);
	const { user, setUser } = useUser();

	const onLogout = useCallback(() => setUser(null), [setUser]);

	return (
		<AppShell className={styles.layout}>
			<AppShell.Header className={styles.header}>
				<Group gap="xs">
					<ActionIcon
						variant="transparent"
						onClick={onLogout}
						data-testid="logout-button"
					>
						<IconLogout2 />
					</ActionIcon>
					<Text>{t("layout.Greeting", { name: user?.username })}</Text>
				</Group>
			</AppShell.Header>

			{/* Content */}
			<div className={styles.content}>{children}</div>
		</AppShell>
	);
};
