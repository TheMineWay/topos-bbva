import { LANGUAGES } from "@i18n/language.enum";
import { TRANSLATIONS } from "@i18n/translation.enum";
import { ActionIcon, Menu } from "@mantine/core";
import { IconCheck, IconLanguage } from "@tabler/icons-react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

export const LanguagePicker: FC = () => {
	return (
		<Menu>
			<Menu.Target>
				<ActionIcon>
					<IconLanguage />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<LanguageOptions />
			</Menu.Dropdown>
		</Menu>
	);
};

/* Internal components */

/**
 * DEV COMMENT:
 * To avoid multiple hook instances, the i18n hook is only declared in this component, then it is passed down as props.
 */
const LanguageOptions: FC = () => {
	const { t, i18n } = useTranslation(TRANSLATIONS.COMMON);

	return Object.entries(LANGUAGES).map(([key, value]) => (
		<LanguageOption
			key={key}
			language={value}
			isSelected={i18n.language === value}
			t={t}
			onClick={() => i18n.changeLanguage(value)}
		/>
	));
};

type LanguageOptionProps = {
	language: string;
	isSelected?: boolean;
	t: TFunction;
	onClick: CallableFunction;
};

const LanguageOption: FC<LanguageOptionProps> = ({
	language,
	isSelected = false,
	t,
	onClick,
}) => {
	return (
		<Menu.Item
			leftSection={isSelected && <IconCheck />}
			onClick={() => onClick()}
		>
			{t(`languages.${language}.Name`)}
		</Menu.Item>
	);
};
