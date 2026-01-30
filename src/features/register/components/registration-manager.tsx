import { Paper, Title } from "@mantine/core";
import styles from "./registration-manager.module.css";
import {
	REGISTRATION_FORM_SCHEMA,
	RegistrationForm,
	type RegistrationFormValues,
} from "./form/registration.form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@i18n/translation.enum";

export const RegistrationManager: FC = () => {
	const { t } = useTranslation(TRANSLATIONS.REGISTER);

	const form = useForm<RegistrationFormValues>({
		resolver: zodResolver(REGISTRATION_FORM_SCHEMA),
		reValidateMode: "onChange",
	});

	return (
		<Paper shadow="md" p="lg" className={styles.root}>
			<Title className="center">{t("Title")}</Title>
			<RegistrationForm form={form} onSuccess={(data) => console.log(data)} />
		</Paper>
	);
};
