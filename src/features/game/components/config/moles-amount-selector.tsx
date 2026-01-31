import { ActionIcon, Group } from "@mantine/core";
import type { UseMolesCount } from "../../hooks/use-moles-count";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import mole from "../../../../assets/game/mole.png";
import styles from "./moles-amount-selector.module.css";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../../../i18n/translation.enum";

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
			>
				<IconPlus />
			</ActionIcon>
			<img src={mole} className={styles.icon} alt={t("assets.Mole")} />
			<ActionIcon
				size="lg"
				disabled={!canDecrease}
				onClick={decrease}
				aria-label={t("config.moles-amount.actions.Decrease")}
			>
				<IconMinus />
			</ActionIcon>
		</Group>
	);
};
