import { Button, Input } from "@mantine/core";
import { IconLogin2 } from "@tabler/icons-react";
import { TRANSLATIONS } from "@i18n/translation.enum";
import { Controller, useFormState, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z from "zod";

const MIN_USERNAME_LENGTH = 2;
const MAX_USERNAME_LENGTH = 64;

export const REGISTRATION_FORM_SCHEMA = z.object({
    username: z.string().min(MIN_USERNAME_LENGTH).max(MAX_USERNAME_LENGTH),
});
export type RegistrationFormValues = z.infer<typeof REGISTRATION_FORM_SCHEMA>;

type Props = {
    form: UseFormReturn<RegistrationFormValues>;
    onSuccess: (data: RegistrationFormValues) => void;
};

export const RegistrationForm: FC<Props> = ({ form: { control, handleSubmit }, onSuccess }) => {
    const { t } = useTranslation([TRANSLATIONS.REGISTER]);
    const formState = useFormState({ control });

    return <form onSubmit={handleSubmit(onSuccess)}>
        <Controller control={control} name="username" render={({ field }) => (
            <Input.Wrapper label={t('form.fields.username.Label')} required>
                <Input minLength={MIN_USERNAME_LENGTH} maxLength={MAX_USERNAME_LENGTH} {...field} value={field.value ?? ''}/>
            </Input.Wrapper>
        )}/>

        <Button leftSection={<IconLogin2/>} type="submit" fullWidth disabled={!formState.isValid}>{t('form.Submit')}</Button>
    </form>
}