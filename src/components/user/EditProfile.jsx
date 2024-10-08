import React from 'react'
import { updateDataUser, updateImageUser } from '../../servicios/ApiRestBlogAxios'
import {showAlert} from '../../helpers/helpers'
import useAuth from '../../hooks/useAuth'

const EditProfile = () => {

  const { auth, setAuth, isLoading, setIsLoading } = useAuth()

    const handleCrear = async (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const surname = form.surname.value
        const bio = form.bio.value
        const imagen = form.archivo.files[0]
        if(name == '' || surname == '' || bio == ''){
            showAlert('Error','Todos los campos son obligatorios','error')
            return
        }
        const token = JSON.parse(localStorage.getItem('token'))
        if(!token){
          showAlert('Error','No hay Token en la peticion','error')
          return
        }

        const datos = {
          name,
          surname,
          bio
        }
  
        const result  = await peticionAxios(datos,token[0].token)
        if(result.status=='success'){

            if (imagen != null) {
              //esto ya funciona se utiliza el formData como en postman para mandar los datos, donde archivo es
              //el valor que requiere el validaro del back para validar que va la imagen y en la variable imagen van los datos de la imagen
              const formData = new FormData()
              formData.append('archivo', imagen)
              const result2 = await updateImageUser(formData, token[0].token)
      
            }
            showAlert('Exito','Se Actualizo Correctamente','success')
            setIsLoading(true)
            return
        }
        if(result.status=='error'){
            showAlert('Error',result.msg,'error')
            return
        }
    }

    const peticionAxios = (datos, token) => {
        const adduser = updateDataUser(datos,token)
        return adduser
    }

  return (
    <>
    <header className="content__header">
                <h1 className="content__title">Editar Mis Datos</h1>
            </header>
            <div className="content__posts">
                <form className='register-form' onSubmit={handleCrear}>
                    <div className='form-group'>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name='name' defaultValue={auth.result && auth.result.length > 0 && auth.result[0].name}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="surname">Surname</label>
                        <input type="text" name='surname' defaultValue={auth.result && auth.result.length > 0 && auth.result[0].surname}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="bio">Bio</label>
                        <textarea name="bio" id="bio" defaultValue={auth.result && auth.result.length > 0 && auth.result[0].bio}></textarea>
                    </div>
                    <div className='form-group spaceButon'>
                        <label htmlFor="imagen">Avatar</label>
                        <div className='imgEditProfile'>
                          <img src={auth.result && auth.result.length > 0 ? `${import.meta.env.VITE_API_URL}mostrar-imagen-nombre/${auth.result[0].imagen}` : ''} className="container-avatar__img" alt="Foto de perfil" />
                        </div>
                        <input type="file" name='archivo' id='archivo'/>
                    </div>
                    <input type="submit" className='btn btn-success' value="Guardar" />
                </form>
            </div>
    </>
  )
}

export default EditProfile
