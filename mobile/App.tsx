import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { NativeBaseProvider, StatusBar } from "native-base";
import { THEME } from './src/styles/theme'
import { Loading } from './src/components/Loading';
import { SignIn } from './src/pages/Signin';

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })
    return (
        <NativeBaseProvider theme={THEME}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true}
            />
            {fontsLoaded ? <SignIn /> : <Loading />}
        </NativeBaseProvider>
    );
}

