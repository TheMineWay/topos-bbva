import { Paper, Title } from "@mantine/core";
import styles from "./registration-manager.module.css";
import { REGISTRATION_FORM_SCHEMA, RegistrationForm, type RegistrationFormValues } from "./form/registration.form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const RegistrationManager: FC = () => {
    const form = useForm<RegistrationFormValues>({
        resolver: zodResolver(REGISTRATION_FORM_SCHEMA)
    });

    return <Paper shadow="md" p="lg" className={styles.root}>
        <Title className="center">Register player</Title>
        <RegistrationForm form={form} onSuccess={(data) => console.log(data)} />
    </Paper>;
}