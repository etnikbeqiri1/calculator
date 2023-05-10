import {useToggle, upperFirst} from '@mantine/hooks';
import {useForm} from '@mantine/form';

import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Checkbox,
    Anchor,
    Stack, Container,
} from '@mantine/core';
import {ApiClient} from "../../api";
import {notifications} from "@mantine/notifications";
import {useAuthStore} from "../../store";

interface IAuthenticationForm {
    username: string,
    name: string,
    password: string,
    terms: boolean
}
export function AuthenticationForm(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm<IAuthenticationForm>({
        initialValues: {
            username: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            username: (val) => val.length <= 4 ? "Username should be longer than 5 chars" : null,
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });
    const setToken = useAuthStore((state) => state.setToken);
    const handleFormSubmit = async (value: IAuthenticationForm) => {
        const {username, name, password, terms} = value;

        if(type === 'login') {
            try {
                const response = await ApiClient.login(username, password);
                setToken(response.data.token);
                notifications.show({
                    color: 'green',
                    title: 'Success',
                    message: 'Registered Successfully',
                })
            }catch (e) {
                notifications.show({
                    color: 'red',
                    title: 'Error',
                    message: 'Wrong credentials please try again',
                })
            }
        } else {
            try {
                const response = await ApiClient.register(name, username, password, terms);
                notifications.show({
                    color: 'green',
                    title: 'Success',
                    message: response.data.message,
                });
                toggle();
            }catch (e) {
                notifications.show({
                    color: 'red',
                    title: 'Error',
                    message: 'Please fill your details correctly and try again',
                })
            }
        }
    }

    return (
        <Container size={420} my={40}>
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" weight={500}>
                    Welcome to Calculator, {type} with
                </Text>

                <form onSubmit={form.onSubmit(handleFormSubmit)}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                radius="md"
                            />
                        )}

                        <TextInput
                            required
                            label="Username"
                            placeholder="johndoe"
                            value={form.values.username}
                            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid username'}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        )}
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}