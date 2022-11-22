import { createContext, ReactNode, useState, useEffect } from "react"
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser'
import * as dotEnv from 'dotenv'
import { api } from "../connections/api";


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

    async function signIn() {
        try {
            setIsUserLoading(true)
            await promptAsync()
        } catch (error) {
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
            api.defaults.headers.common["Authorization"] = `Bearer ${resToken.data.token}` 
            //console.log(resToken.data)

            const { data } = await api.get<{user:InterfaceUser}>("/me")
            //console.log(data)

            setUser(data.user)
        }catch(error){
            console.log(error)
            throw error;
        }finally{
            setIsUserLoading(false)
        }

        //console.log("accessToken: ", accessToken)
    }

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