import {useState, useEffect} from 'react'
import { FlatList as FlatList2} from 'react-native'
import { FlatList, useToast } from 'native-base';
import { api } from '../connections/api';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { AxiosError } from 'axios';

interface Props {
    poolId: string;
    code: string;
}

export function Guesses({ poolId, code }: Props) {
    const toast = useToast()

    const [isLoading, setIsLoading] = useState(true)
    const [firstTeamPoints, setFirstTeamPoints] = useState('')
    const [secondTeamPoints, setSecondTeamPoints] = useState('')
    const [games, setGames] = useState<GameProps[]>([])

    async function getGames(){
        try{
            setIsLoading(true)
            const res = await api.get(`/pools/${poolId}/games`);
            setGames(res.data.games)
        }catch(error){
            console.log(error)

            toast.show({
                title: "Não Foi Possivel Carregar os Jogos :(",
                bgColor: "red.500",
                placement: "top",
            })
        }finally{
            setIsLoading(false)
        }
    }

    async function setGuess(gameId: string){
        try{
            if(!firstTeamPoints.trim() || !secondTeamPoints.trim()) return toast.show({
                title: "Informe o Placar dos Dois Times",
                color:"gray.800",
                bgColor: "yellow.400",
                placement: "top",
            })

            await api.post(`/pools/${poolId}/games/${gameId}/guesses`,{
                firstTeamPoints: Number(firstTeamPoints),
                secondTeamPoints: Number(secondTeamPoints),
            })
            
            toast.show({
                title: "Palpite Salvo",
                bgColor: "green.500",
                placement: "top",
            })

            getGames();

        }catch(error){
            let erro = error as AxiosError
            console.log(erro.response?.data )

            toast.show({
                title: "Não Foi Possivel Enviar o Palpite :(",
                bgColor: "red.500",
                placement: "top",
            })
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getGames();
    },[poolId])

    if(isLoading)( <Loading/>)

    return (
        <>
            {
                games.length ? (
                    <FlatList
                        data={games}
                        keyExtractor={(item) => item.id}
                        _contentContainerStyle={{ pb: "24" }}
                        ListEmptyComponent={<EmptyMyPoolList code={code} />} 
                        renderItem={({ item }) => (
                            <Game
                                data={item}
                                setFirstTeamPoints={setFirstTeamPoints}
                                setSecondTeamPoints={setSecondTeamPoints}
                                onGuessConfirm={() => setGuess(item.id)}
                            />
                        )}
                    />
                )
                : <Loading/>


            }
        </>

        
    );
}
