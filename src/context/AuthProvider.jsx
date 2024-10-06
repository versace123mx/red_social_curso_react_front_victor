import React, { createContext, useState, useEffect } from 'react'
import { getDataCounter, getDataUserLogin } from '../servicios/ApiRestBlogAxios'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [counter, setCounter] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        peticionAxios()
    },[isLoading])
    
    const peticionAxios = async () => {
        //obtener token
        const getToken = localStorage.getItem('token')
        if(!getToken){
            console.log('entro en 1 por que no hay token')
            return false
        }
        
        const userObj = JSON.parse(getToken)
        const result = await getDataUserLogin(userObj[0].token)
        const resultCounter = await getDataCounter(userObj[0].token)
        setAuth(result)
        setCounter(resultCounter)
        setIsLoading(false)
    }
    
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                counter,
                setCounter,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
