import { ActionIcon, Modal } from "@mantine/core";
import { IconTrophyFilled } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../../i18n/translation.enum";
import { BestScore } from "./best-score";
import { useDisclosure } from "@mantine/hooks";

export const ShowBestScore: FC = () => {
	const { t } = useTranslation(TRANSLATIONS.COMMON);
	const [isBestScoreVisible, { open: openBestScore, close: closeBestScore }] =
		useDisclosure();

	return (
		<>
			<ActionIcon aria-label={t("best-score.Title")} onClick={openBestScore}>
				<IconTrophyFilled />
			</ActionIcon>

			{/* Modals */}
			<Modal
				opened={isBestScoreVisible}
				onClose={closeBestScore}
				title={t("best-score.Title")}
			>
				<BestScore />
			</Modal>
		</>
	);
};
