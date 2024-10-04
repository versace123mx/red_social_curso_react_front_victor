import React, { createContext, useState, useEffect } from 'react'
import { getDataUserLogin } from '../servicios/ApiRestBlogAxios'
const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})

    useEffect(() =>{
        peticionAxios()
    },[])
    
    const peticionAxios = async () => {
        //obtener token
        const getToken = localStorage.getItem('token')
        if(!getToken){
            console.log('entro en 1 por que no hay token')
            return false
        }
        console.log('entro en 2')
        
        const userObj = JSON.parse(getToken)
        const result = await getDataUserLogin(userObj[0].token)
        //console.log(result)
        setAuth(result)
    }
    
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
