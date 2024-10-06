import React from 'react'
import useForm from '../../hooks/useForm'
import {showAlert, expresion_correo} from '../../helpers/helpers'
import { loginUser } from '../../servicios/ApiRestBlogAxios'
import { useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'

const Login = () => {

    const { setIsLoading } = useAuth()//este lo utilizo para cuando hago loguin correctamente, entonces le cambio el valor, para que el provider se ejecute de nuevo y cargue los valores necesarios que para ese entonces ya estarian en el localstorage
    const navigate = useNavigate()
    const {form,change} = useForm({})//Nota: este no es un useState es un hook personalizado

    const handleLogin = async (e) => {
        e.preventDefault()
        const login = form //el campo ya trae el value pr eso solo se manda a llamar

        if(Object.keys(login).length === 0 ){
            showAlert('Error','Todos los campos son obligatorios','error')
            return
        }

        if(login.email == '' || login.password == ''){
            showAlert('Error','Todos los campos son obligatorios','error')
            return
        }

        if(login.email != ''){
            if (!expresion_correo.test(login.email)) {
                showAlert('Error','El email no es valido, comprueba que tenga un formato valido.','error')
                return
            }
        }

        const result = await peticionAxios(login)
        if(result.status=='success'){
            localStorage.setItem('token',JSON.stringify(result.result))
            //showAlert('Exito',result.msg,'success')
            setIsLoading(false)
            navigate('/social')
            return
        }
        if(result.status=='error'){
            showAlert('Error',result.msg,'error')
            return
        }
    }

    const peticionAxios = (datalogin) => {
        const adduser = loginUser(datalogin)
        return adduser
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Login</h1>
            </header>
            <div className="content__posts">
                <form className='form-login' onSubmit={handleLogin} noValidate>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' onChange={change}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' onChange={change}/>
                    </div>
                    <input type="submit" value="Enviar"/>
                </form>
            </div>
        </>
    )
}

export default Login
