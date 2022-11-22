import { useState } from 'react'
import { Heading, useToast, VStack } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";

import { Button } from "../components/Button";
import { api } from '../connections/api';
import { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';

export function Find() {
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState("")

    const toast = useToast()
    const {navigate} = useNavigation()

    async function joinPool() {
        if (!code.trim()) return toast.show({
            title: "Informe o Código!",
            bgColor: "red.500",
            placement: "top"
        })

        try {
            setIsLoading(true)
            
             await api.post("/pools/join", { code })
             setIsLoading(false)
             
             toast.show({
                title: "Você Entrou no Bolão com Sucesso :)",
                bgColor: "green.500",
                placement: "top"
            })

            setCode("")
            navigate("pools")

        } catch (error) {
            const erro = error as AxiosError<{ message: string }>
            console.log(erro.response?.data)
            setIsLoading(false)
            
            switch (erro.response?.data.message) {
                case "Pool Not Found":
                    toast.show({
                        title: "Bolão Não Encontrado !",
                        bgColor: "red.500",
                        placement: "top"
                    })
                    break;
                case "You Already Joined this Pool!":
                    toast.show({
                        title: "Você já Está Participando desse Bolão !",
                        bgColor: "red.500",
                        placement: "top"
                    })
                    break;

                default:
                    toast.show({
                        title: "Não Foi Possivel Encontrar o Bolão :(",
                        bgColor: "red.500",
                        placement: "top"
                    })
                    break;
            }
        }
    }
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton />
            <VStack mx={5} alignItems="center">

                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Encontre um bolão através de {"\n"} seu código único
                </Heading>

                <Input
                    mb={3}
                    placeholder="Qual o código do bolão?"
                    autoCapitalize="characters"
                    value={code}
                    onChangeText={value => setCode(value.toUpperCase())}
                //onChange={({nativeEvent:{ eventCount, target, text}}) => console.log(text)}
                />

                <Button title="BUSCAR BOLÃO" isLoading={isLoading} onPress={joinPool} />
            </VStack>
        
        </VStack>
    );
}