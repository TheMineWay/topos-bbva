import { useTranslation } from "react-i18next";
import mole from "../../../../assets/game/mole.png";
import { TRANSLATIONS } from "../../../../i18n/translation.enum";
import styles from "./mole-render.module.css";

type Props = {
	onHit?: CallableFunction;
};

export const MoleRender: FC<Props> = ({ onHit }) => {
	const { t } = useTranslation(TRANSLATIONS.GAME);

	return (
		<button onClick={() => onHit?.()} type="button" className={styles.mole}>
			<img src={mole} alt={t("assets.Mole")} />
		</button>
	);
};
