import { Center, Icon, Text } from "native-base";
import { Fontisto } from '@expo/vector-icons'

import Logo from "../assets/logo.svg"

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {

    const { user, signIn } = useAuth()

    console.log(`Dados User => {
        nome:${user.name},
        avaterUrl:${user.avatarUrl}
    }`)
    
    return (
        <Center flex={1} bgColor="gray.900" px="7">
            <Logo width={212} height={40} />
            <Button
                mt="12"
                type="SECONDARY"
                isLoading={false}
                title="ENTRAR COM GOOGLE"
                onPress={signIn}
                leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
            />
            <Text color="gray.200" textAlign="center" fontSize="sm" mt="4">
                Não utilizamos nenhuma informação além {"\n"} do seu e-mail para criação de sua conta.
            </Text>
        </Center>
    )
}