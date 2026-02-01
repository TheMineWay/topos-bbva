import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "../../../i18n/translation.enum";
import mole from "../../../assets/game/mole.png";
import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "src">;

export const MoleAvatar: FC<Props> = (props) => {
	const { t } = useTranslation(TRANSLATIONS.GAME);

	return <img src={mole} alt={t("assets.Mole")} {...props} />;
};
