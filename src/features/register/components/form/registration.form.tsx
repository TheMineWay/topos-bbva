import { Button, Input } from "@mantine/core";
import { IconLogin2 } from "@tabler/icons-react";
import { Controller, Form, type UseFormReturn } from "react-hook-form";

export type RegistrationFormValues = {
    username: string;
}

type Props = {
    form: UseFormReturn<RegistrationFormValues>;
    onSuccess: (data: RegistrationFormValues) => void;
};

export const RegistrationForm: FC<Props> = ({ form: { control, handleSubmit }, onSuccess }) => {
    return <Form control={control} onSubmit={handleSubmit(onSuccess)}>
        <Controller control={control} name="username" render={({ field }) => (
            <Input.Wrapper label="Username" required>
                <Input minLength={2} maxLength={64} {...field}/>
            </Input.Wrapper>
        )}/>

        <Button leftSection={<IconLogin2/>} type="submit" fullWidth>Register</Button>
    </Form>
}