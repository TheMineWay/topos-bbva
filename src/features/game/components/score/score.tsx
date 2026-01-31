import { Indicator, Title } from "@mantine/core";
import type { UseScore } from "../../hooks/use-score";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../../../i18n/translation.enum";

type Props = {
	manager: UseScore;
};

export const Score: FC<Props> = ({ manager }) => {
	const { t } = useTranslation(TRANSLATIONS.GAME);

	return (
		<Indicator
			label={t("score.New-record")}
			size="xs"
			disabled={!manager.isBestScore}
		>
			<Title>{t("score.Points", { score: manager.score })}</Title>
		</Indicator>
	);
};
