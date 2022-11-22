import { useRef, useState } from "react";
import { Heading, Button as Button_NB, Text, VStack, useToast, AlertDialog } from "native-base";

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { api } from "../connections/api";

import Logo from '../assets/logo.svg'

export function New() {

    const [title, setTitle] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [isOpen, setIsOpen] = useState(false);


    const cancelRef = useRef(null);

    const toast = useToast()


    async function createPool() {
        try {
            setIsOpen(false)
            setIsLoading(true)

            await api.post("/pools", { title })

            toast.show({
                title: "Bolão Criado Com Sucesso :)",
                placement: "top",
                bgColor: "green.500",
            })

            setTitle("")

        } catch (error) {
            console.log(error)

            toast.show({
                title: "Não Foi Possivel Criar o Bolão :(",
                placement: "top",
                bgColor: "red.500",
            })

        } finally {
            setIsLoading(false)
        }
    }

    function validationPool() {
        if (!title.trim()) return toast.show({
            title: "Informe um Nome Para Seu Bolão !",
            placement: "top",
            bgColor: "red.500",
        })
        setIsOpen(true)
    }

    return (
        <VStack flex={1} bgColor="gray.900">

            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen}>
                <AlertDialog.Content >
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Confirmação de Dados</AlertDialog.Header>
                    <AlertDialog.Body>
                        <Text>Você deseja criar um bolão com o nome de <Text color="red.500" bold>{title}</Text>?</Text>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button_NB.Group space={5}>
                            <Button_NB variant="subtle" colorScheme="coolGray" onPress={oldValue => setIsOpen(!oldValue)} ref={cancelRef}>
                                <Text>Cancelar</Text>
                            </Button_NB>
                            <Button_NB colorScheme="danger" onPress={createPool}>
                                <Text>Criar</Text>
                            </Button_NB>
                        </Button_NB.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>

            <Header title="Criar novo bolão" />
            <VStack mt={8} mx={5} alignItems="center">
                <Logo />

                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Crie seu próprio bolão da copa {"\n"} e compartilhe entre amigos!
                </Heading>

                <Input mb={3} placeholder="Qual nome do seu bolão?" selectionColor="yellow" onChangeText={value => setTitle(value)} value={title} />

                <Button title="CRIAR MEU BOLÃO" onPress={validationPool} isLoading={isLoading} />

                <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
                    Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
                </Text>
            </VStack>

        </VStack >
    );
}