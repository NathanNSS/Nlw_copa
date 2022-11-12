import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { NativeBaseProvider, StatusBar } from "native-base";
import { THEME } from './src/styles/theme'
import { Loading } from './src/components/Loading';
import { Pools } from './src/pages/Pools';
import { AuthProvider } from "./src/contexts/AuthContext";
import * as dotenv from 'dotenv'

dotenv.config()

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })
    return (
        <NativeBaseProvider theme={THEME}>
            <AuthProvider>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent={true}
                />
                {fontsLoaded ? <Pools /> : <Loading />}
            </AuthProvider>
        </NativeBaseProvider>
    );
}


