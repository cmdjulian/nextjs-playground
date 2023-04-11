// noinspection JSUnusedGlobalSymbols

import {Button, Container, TextInput} from '@mantine/core'
import type {NextPage} from 'next'
import axios from "axios";
import {useForm} from "@mantine/form";
import {useLocalStorage} from "@mantine/hooks";


const Login: NextPage = () => {
    const [token, setToken] = useLocalStorage<string>({key: 'token'});
    const form = useForm({
        initialValues: {email: '', password: ''},

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 2 ? 'Password must have at least 2 letters' : null)
        },
    });

    const sendAction = (props: LoginRequest) => {
        axios.post<LoginResponse>("http://localhost:8080/api/auth", {email: props.email, password: props.password})
            .then(resp => setToken(resp.data.token))
            // TODO: error handling with cool banner
            .catch((it) => console.error(`could not send data: ${it}`))
    }

    return (
        <>
            <Container>
                <form onSubmit={form.onSubmit(sendAction)}>
                    <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                    <TextInput label="Password" type={"password"}
                               placeholder="Password" {...form.getInputProps('password')} />
                    <Button type="submit" mt="sm">Submit</Button>
                </form>
            </Container>
        </>

        /*
        TODO: Notification on failed Login Attempt
        <Notification icon={<IconX size={18}/>} color="red">Bad Credentials!</Notification>
         */
    )
}

interface LoginRequest {
    email: string
    password: string
}

interface LoginResponse {
    token: string
    mustChangePassword: boolean
    previousLogin: Date
}

export default Login
