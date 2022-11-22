import { useCallback, useState } from 'react'
import { FlatList, useToast, VStack } from "native-base";
import { MagnifyingGlass } from "phosphor-react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { api } from "../connections/api";
import { Loading } from '../components/Loading';
import { PoolCard, PoolCardProps } from '../components/PoolCard';
import { EmptyPoolList } from '../components/EmptyPoolList';

declare module InterfacePools {

    export interface Count {
        participants: number;
    }

    export interface Owner {
        id: string;
        name: string;
    }

    export interface RootObject {
        _count: Count;
        code: string;
        createdAt: Date;
        id: string;
        owner: Owner;
        ownerId: string;
        participants: string[][];
        title: string;
    }

}


export function Pools() {
    const [isLoading, setIsLoading] = useState(true)
    const [pools, setPools] = useState<PoolCardProps[]>([])

    const { navigate } = useNavigation()
    const toast = useToast()

    async function getMyPools() {
        try {
            setIsLoading(true)
            const res = await api.get("/pools")

            setPools(res.data.pools)

        } catch (error) {
            console.log(error)

            toast.show({
                title: "Não Foi Possivel Carregar os Bolões :(",
                bgColor: "red.500",
                placement: "top",
            })
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        getMyPools();
    }, []))
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />

            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button title="BUSCAR BOLÃO POR CÓDIGO" leftIcon={<MagnifyingGlass weight="bold" color="black" size={24} />} onPress={() => navigate("find")} />
            </VStack>

            {isLoading ? <Loading /> :
                <FlatList
                    data={pools}
                    keyExtractor={(item) => item.id}
                    px={5}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: "24" }}
                    ListEmptyComponent={<EmptyPoolList />}
                    renderItem={({ item }) => (
                        <PoolCard
                            data={item}
                            key={item.id}
                            onPress={() => navigate("details", { id: item.id })}
                        />
                    )}
                />}
        </VStack>
    )
}