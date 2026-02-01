import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../../i18n/translation.enum";
import mole from "../../../assets/game/mole.png";

export const MoleAvatar = () => {
	const { t } = useTranslation(TRANSLATIONS.GAME);

	return <img src={mole} alt={t("assets.Mole")} />;
};
