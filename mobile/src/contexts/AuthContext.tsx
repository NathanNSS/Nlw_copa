import { createContext, ReactNode, useState, useEffect } from "react"
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser'

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
        clientId:process.env.CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({useProxy:true}),
        scopes:["profile", "email"],
    })

    async function signIn() {
        try{
            setIsUserLoading(true)
            await promptAsync()
        }catch(error){
            console.log(error)
            throw error;
        }finally{
            setIsUserLoading(false)
        }
    }

    function signInGoogle(accessToken:string){
        console.log("accessToken: ",accessToken)
    }

    useEffect(()=>{
        if(response?.type === "success" && response.authentication?.accessToken){
            signInGoogle(response.authentication.accessToken)
        }
    },[response])

    return (
        <AuthContext.Provider value={{ user, isUserLoading, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}