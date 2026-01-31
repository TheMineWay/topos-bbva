import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../../i18n/translation.enum";
import { Text } from "@mantine/core";
import { getBestScore } from "../lib/score.utils";

export const BestScore: FC = () => {
	const { t } = useTranslation(TRANSLATIONS.COMMON);

	const bestScore = getBestScore();

	return (
		<Text>
			{bestScore
				? t("best-score.Score", {
						name: bestScore.username,
						score: bestScore.bestScore,
					})
				: t("best-score.No-score")}
		</Text>
	);
};
