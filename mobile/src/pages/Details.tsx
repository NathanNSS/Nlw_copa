import { useState, useEffect } from 'react'
import { Share } from 'react-native'
import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";

import { api } from '../connections/api';
import { Option } from '../components/Option';
import { Header } from "../components/Header";
import { Loading } from '../components/Loading';
import { Guesses } from '../components/Guesses';
import { PoolHeader } from '../components/PoolHeader';
import { PoolCardProps } from '../components/PoolCard';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';

interface DetailsParams {
    id: string
}

export function Details() {

    const toast = useToast()
    const { id } = useRoute().params as DetailsParams;

    const [isLoading, setIsLoading] = useState(true)
    const [poolDetais, setPoolDatails] = useState<PoolCardProps>({} as PoolCardProps)
    const [optionSelected, setOptionSelected] = useState<"palpites" | "ranking">("palpites")

    async function getDetaisPool(){
        try{
            setIsLoading(true)

            const res = await api.get<{pool:PoolCardProps}>(`/pools/${id}`)
            setPoolDatails(res.data.pool)

            //console.log(res.data)
        }catch(error){
            console.log(error)

            toast.show({
                title: "Não Foi Possivel Carregar as Informações do Bolõe :(",
                bgColor: "red.500",
                placement: "top",
            })
        }finally{
            setIsLoading(false)
        }
    }

    async function shareCode() {
        await Share.share({
            message: poolDetais.code
        })
    }
    useEffect(()=>{
        getDetaisPool();
    },[id])

    if(isLoading) return <Loading/>

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={poolDetais.title} showBackButton showShareButton onShare={shareCode} />
            {
                poolDetais && poolDetais._count?.participants > 0 ?
                    <VStack flex={1} px={5}>
                        <PoolHeader data={poolDetais} />
                        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                            <Option title='Seus Palpites' isSelected={optionSelected === "palpites"} onPress={()=>setOptionSelected("palpites")}/>
                            <Option title='Ranking do Grupo' isSelected={optionSelected === "ranking"} onPress={()=>setOptionSelected("ranking")}/>
                        </HStack>
                        <Guesses poolId={poolDetais.id} code={poolDetais.code}/>
                    </VStack>
                    : <EmptyMyPoolList code={poolDetais.code} />
            }
        </VStack>
    );
}