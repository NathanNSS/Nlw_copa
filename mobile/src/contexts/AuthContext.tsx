import { createContext, ReactNode, useState, useEffect } from "react"
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser'

import { api } from "../connections/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast, useToast } from "native-base";
import { AxiosError } from "axios";


interface InterfaceUser {
    name: string;
    avatarUrl: string
}

export interface InterfaceAuthContext {
    user: InterfaceUser;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

interface InterfaceAuthProvider {
    children: ReactNode
}



export const AuthContext = createContext({} as InterfaceAuthContext)

WebBrowser.maybeCompleteAuthSession();

export function AuthProvider({ children }: InterfaceAuthProvider) {

    const [user, setUser] = useState<InterfaceUser>({} as InterfaceUser)
    const [isUserLoading, setIsUserLoading] = useState(false)

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: String(process.env.CLIENT_ID),
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ["profile", "email"],
    })

    const Toast = useToast()

    async function signIn() {
        try {
            setIsUserLoading(true)
            await promptAsync()
        } catch (error) {
            Toast.show({
                title: "Error interno, volte mais tarder !!",
                placement: "top",
                bgColor: "red.500",
            })
            console.log(error)
            throw error;
        } finally {
            setIsUserLoading(false)
        }
    }

    async function signInGoogle(accessToken: string) {
        try{
            setIsUserLoading(true)
            let resToken = await api.post<{token:string}>("/users", { access_token: accessToken})

            await AsyncStorage.setItem("@access_token", resToken.data.token)
            api.defaults.headers.common["Authorization"] = `Bearer ${resToken.data.token}` 

            const { data } = await api.get<{user:InterfaceUser}>("/me")
            //console.log(data)

            setUser(data.user)
        }catch(error){
            Toast.show({
                title: "Não foi possivel se autenticar, verifique suas informações !",
                placement: "top",
                bgColor: "red.500",
            })
            console.log(error)
            throw error;
        }finally{
            setIsUserLoading(false)
        }

        //console.log("accessToken: ", accessToken)
    }
    async function login_accessToken(){
        try{
            setIsUserLoading(true)
            const token = await AsyncStorage.getItem("@access_token")

            if(!token) throw new Error("Sem token salvos");

            api.defaults.headers.common["Authorization"] = `Bearer ${token}` 

            const { data } = await api.get<{user:InterfaceUser}>("/me")
            setUser(data.user)
        }catch(error){
            const err = error as AxiosError<{statusCode: number; code: string; error: string; message: string;}>

            console.log(error);
            
            if(err.response?.status === 401 ||  err.response?.data.code.slice(0,8) === "FAST_JWT"){
                await AsyncStorage.removeItem("@access_token")    
            }

            Toast.show({
                title: "Não foi possivel logar, se autentique novamente !",
                placement: "top",
                bgColor: "red.500",
            })
        } finally{
            setIsUserLoading(false)
        }
    }

    useEffect(() =>{
        login_accessToken()
    },[])

    useEffect(() => {
        if (response?.type === "success" && response.authentication?.accessToken) {
            signInGoogle(response.authentication.accessToken)
        }
    }, [response])

    return (
        <AuthContext.Provider value={{ user, isUserLoading, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}