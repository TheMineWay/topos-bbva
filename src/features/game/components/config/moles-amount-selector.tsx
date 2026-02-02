import { ActionIcon, Group } from "@mantine/core";
import type { UseMolesCount } from "../../hooks/use-moles-count";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import styles from "./moles-amount-selector.module.css";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../../../i18n/translation.enum";
import { MoleAvatar } from "../../../../common/mole/components/mole-avatar";

type Props = {
	manager: UseMolesCount;
};

export const MolesAmountSelector: FC<Props> = ({ manager }) => {
	const { t } = useTranslation(TRANSLATIONS.GAME);
	const { increase, decrease, canDecrease, canIncrease } = manager;

	return (
		<Group>
			<ActionIcon
				size="lg"
				disabled={!canIncrease}
				onClick={increase}
				aria-label={t("config.moles-amount.actions.Increase")}
				data-testid="increase-moles-button"
			>
				<IconPlus />
			</ActionIcon>
			<div className={styles["moles-indicator"]}>
				<MoleAvatar className={styles.icon} />
				<small data-testid="moles-count-display">x{manager.molesCount}</small>
			</div>
			<ActionIcon
				size="lg"
				disabled={!canDecrease}
				onClick={decrease}
				aria-label={t("config.moles-amount.actions.Decrease")}
				data-testid="decrease-moles-button"
			>
				<IconMinus />
			</ActionIcon>
		</Group>
	);
};
