import { Paper, Title } from "@mantine/core";
import styles from "./registration-manager.module.css";
import { RegistrationForm, type RegistrationFormValues } from "./form/registration.form";
import { useForm } from "react-hook-form";

export const RegistrationManager: FC = () => {
    const form = useForm<RegistrationFormValues>();

    return <Paper shadow="md" p="lg" className={styles.root}>
        <Title className="center">Register player</Title>
        <RegistrationForm form={form} onSuccess={(data) => console.log(data)} />
    </Paper>;
}