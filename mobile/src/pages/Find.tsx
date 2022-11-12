import { Heading, VStack } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";

import { Button } from "../components/Button";

export function Find() {
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton/>
            <VStack mx={5} alignItems="center">

                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Encontre um bolão através de {"\n"} seu código único
                </Heading>

                <Input mb={3} placeholder="Qual o código do bolão?" />

                <Button title="BUSCAR BOLÃO" />
            </VStack>

        </VStack>
    );
}

// Criar novo bolão
// Crie seu próprio bolão da copa e compartilhe entre amigos!
// Qual nome do seu bolão?
// CRIAR MEU BOLÃO
// Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
// Novo bolão
// Meus bolões