import React from 'react'
import useForm from '../../hooks/useForm'
import { addUser } from '../../servicios/ApiRestBlogAxios'
import {showAlert} from '../../helpers/helpers'

const Register = () => {

    const {form,change} = useForm({})

    const handleCrear = async (e) => {
        e.preventDefault()
        let newUser = form
        
        if(Object.keys(newUser).length === 0 ){
            showAlert('Error','Todos los campos son obligatorios','error')
            return
        }
        if(newUser.name == '' || newUser.nick == '' || newUser.email == '' || newUser.password == ''){
            showAlert('Error','Todos los campos son obligatorios','error')
            return
        }

        const result  = await peticionAxios(newUser)
        if(result.status=='success'){
            showAlert('Exito',result.msg,'success')
            return
        }
        if(result.status=='error'){
            showAlert('Error',result.msg,'error')
            return
        }
    }

    const peticionAxios = (newUser) => {
        const adduser = addUser(newUser)
        return adduser
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Registro</h1>
            </header>
            <div className="content__posts">
                <form className='register-form' onSubmit={handleCrear}>
                    <div className='form-group'>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name='name' onChange={change}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="nick">Nick</label>
                        <input type="text" name='nick' onChange={change}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' onChange={change}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' onChange={change}/>
                    </div>
                    <input type="submit" className='btn btn-success' value="Registrate" />
                </form>
            </div>
        </>
    )
}

export default Register
