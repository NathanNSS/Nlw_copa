import { VStack } from "native-base";
import {MagnifyingGlass} from "phosphor-react-native"
import { useNavigation  } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";

export function Pools(){
    const { navigate } = useNavigation()

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões"/>
            
            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button title="BUSCAR BOLÃO POR CÓDIGO" leftIcon={<MagnifyingGlass weight="bold" color="black" size={24}/>} onPress={()=> navigate("find")}/>
            </VStack>
        </VStack>
    )
}