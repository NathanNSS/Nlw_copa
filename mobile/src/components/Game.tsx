import { useState, useEffect } from 'react'
import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';

import { Team } from './Team';
import { IGuess } from './Guesses';

interface GuessProps {
    id: string;
    gameId: string;
    createdAt: string;
    participantId: string;
    firstTeamPoints: number;
    secondTeamPoints: number;
}

export interface GameProps {
    id: string;
    firstTeamCountryCode: string;
    secondTeamCountryCode: string;
    guess: null | GuessProps;
    date: string | Date;
};

interface Props {
    data: GameProps;
    onGuessConfirm: ({ }: IGuess) => Promise<unknown>;
};

export function Game({ data, onGuessConfirm }: Props) {
    const [firstTeamPoints2, setFirstTeamPoints2] = useState(String(data.guess?.firstTeamPoints ?? 0))
    const [secondTeamPoints2, setSecondTeamPoints2] = useState(String(data.guess?.secondTeamPoints ?? 0))

    const [isLoading, setIsLoading] = useState(false)

    const { colors, sizes } = useTheme();


    function transformeDate(date: Date): string {
        const data = new Date(date)
        let [vd, day, month, year, time] = data.toUTCString().split(",")[1].split(" ")
        month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][data.getMonth()];
        return `${day} de ${month} de ${year} às ${time.slice(0, -3)}h`
    }

    async function setGuessDad() {
        try{
            setIsLoading(true)
            await onGuessConfirm({gameId:data.id,firstTeamPoints:firstTeamPoints2, secondTeamPoints:secondTeamPoints2})
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <VStack
            w="full"
            bgColor="gray.800"
            rounded="sm"
            alignItems="center"
            borderBottomWidth={3}
            borderBottomColor="yellow.500"
            mb={3}
            p={4}
        >
            <Text color="gray.100" fontFamily="heading" fontSize="sm">
                {getName(data.firstTeamCountryCode)} vs {getName(data.secondTeamCountryCode) ?? "Erro"}
            </Text>

            <Text color="gray.200" fontSize="xs">
                {transformeDate(data.date as Date)}
                {/* Usando a LIB "dayjs" >>> */}{/* {dayjs(data.date).locale(ptBR).format("DD [de] MMMM [de] YYYY")} */}
            </Text>

            <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
                <Team
                    code={data.firstTeamCountryCode}
                    position="right"
                    onChangeText={setFirstTeamPoints2}
                    value={firstTeamPoints2}
                    editable={!data.guess}
                />

                <X color={colors.gray[300]} size={sizes[6]} />

                <Team
                    code={data.secondTeamCountryCode}
                    position="left"
                    onChangeText={setSecondTeamPoints2}
                    value={secondTeamPoints2}
                    editable={!data.guess}
                />
            </HStack>

            {
                !data.guess &&
                <Button size="xs" w="full" bgColor="green.500" mt={4} isLoading={isLoading} onPress={() => setGuessDad()}>
                    <HStack alignItems="center">
                        <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
                            CONFIRMAR PALPITE
                        </Text>

                        <Check color={colors.white} size={sizes[4]} />
                    </HStack>
                </Button>
            }
        </VStack>
    );
}