import {useContext} from 'react'

import {AuthContext, InterfaceAuthContext} from "../contexts/AuthContext"


export function useAuth():InterfaceAuthContext{

    const context = useContext(AuthContext)

    return context;

}