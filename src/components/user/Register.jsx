import React from 'react'
import useForm from '../../hooks/useForm'

const Register = () => {

    const {form,change} = useForm({})

    
    const handleCrear = (e) => {
        e.preventDefault()
        let newUser = form
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
