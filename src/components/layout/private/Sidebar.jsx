import React, { useEffect, useRef } from 'react'
import useAuth from '../../../hooks/useAuth'
import Spinner2 from '../../general/Spinner2'
import { Link } from 'react-router-dom'
import { showAlert } from '../../../helpers/helpers'
import { addNewPublicationUser, updateImagePublication } from '../../../servicios/ApiRestBlogAxios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {

    const formRef = useRef(null);
    const { auth, isLoading, setIsLoading, counter, setCounter } = useAuth()//esto lo traemos del hook useAuth que se trae los datos del context
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
        showAlert('Error', 'No hay Token en la peticion', 'error')
        return
    }

    const addPublication = async (e) => {
        e.preventDefault()
        const form  = e.target
        const publicacion = form.post.value
        const imagen = form.archivo.files[0]

        if(publicacion == ''){
            showAlert('Error',`El campo (que estas pensando) esta vacio`,'error')
            return
        }
        const data = {
            publicacion
        }

        const result = await addNewPublicationUser(data,token[0].token)
        //console.log(result)//aqui tengo que extraer el id para pasarlo en la carga de la imagen
        if (result.status == 'success') {
            if (imagen != null) {
                //esto ya funciona se utiliza el formData como en postman para mandar los datos, donde archivo es
                //el valor que requiere el validaro del back para validar que va la imagen y en la variable imagen van los datos de la imagen
                const formData = new FormData()
                formData.append('archivo', imagen)
                const result2 = await updateImagePublication(formData, token[0].token,result.result[0].uid)
        
            }
            toast.success(`🦄 Haz agregado una nueva publicacion`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

            // Resetear el formulario
            formRef.current.reset();

            //modificacion del objeto para incrementarlo en 1
            const newContadorUserLogin = {
                ...counter,
                result: counter.result.map((item, index) =>
                    index === 0 ? { ...item, publications: item.publications + 1 } : item // Modificar solo el primer objeto
                )
            }
            setCounter(newContadorUserLogin)
        }

        if (result.status == 'error') {
            toast.error('🦄 Error al Crear la publicación!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
    }

    //console.log('Contador desde sidebar',counter)
    return (
        <>
            {isLoading ? <Spinner2 /> : (
                <>

                    <aside className="layout__aside">
                        <header className="aside__header">
                            <h1 className="aside__title">Hola, {auth.result && auth.result.length > 0 ? auth.result[0].name : 'no ha cargado bien'}</h1>
                        </header>

                        <div className="aside__container">

                            <div className="aside__profile-info">

                                <div className="profile-info__general-info">
                                    <div className="general-info__container-avatar">
                                        <img src={auth.result && auth.result.length > 0 ? `${import.meta.env.VITE_API_URL}mostrar-imagen-nombre/${auth.result[0].imagen}` : ''} className="container-avatar__img" alt="Foto de perfil" />
                                    </div>

                                    <div className="general-info__container-names">
                                        <Link to={`profile/${auth.result && auth.result.length > 0 && auth.result[0].uid}`} className="container-names__name">{auth.result && auth.result.length > 0 ? auth.result[0].name : 'no cargo bien'}</Link>
                                        <p className="container-names__nickname">{auth.result && auth.result.length > 0 ? auth.result[0].nick : 'no cargo bien'}</p>
                                    </div>
                                </div>

                                <div className="profile-info__stats">

                                    <div className="stats__following">
                                        <Link to={`/social/siguiendo/${auth.result[0].uid}`} className="following__link">
                                            <span className="following__title">Siguiendo</span>
                                            <span className="following__number">{counter.result && counter.result.length > 0 ? counter.result[0].following : 0}</span>
                                        </Link>
                                    </div>
                                    <div className="stats__following">
                                        <Link to={`/social/seguidores/${auth.result[0].uid}`} className="following__link">
                                            <span className="following__title">Seguidores</span>
                                            <span className="following__number">{counter.result && counter.result.length > 0 ? counter.result[0].followed : 0}</span>
                                        </Link>
                                    </div>


                                    <div className="stats__following">
                                        <Link to={`profile/${auth.result && auth.result.length > 0 && auth.result[0].uid}`} className="following__link">
                                            <span className="following__title">Publicaciones</span>
                                            <span className="following__number">{counter.result && counter.result.length > 0 ? counter.result[0].publications : 0}</span>
                                        </Link>
                                    </div>


                                </div>
                            </div>


                            <div className="aside__container-form">

                                <form className="container-form__form-post" onSubmit={addPublication} ref={formRef}>

                                    <div className="form-post__inputs">
                                        <label htmlFor="post" className="form-post__label">¿Que estas pesando hoy?</label>
                                        <textarea name="post" className="form-post__textarea"></textarea>
                                    </div>

                                    <div className="form-post__inputs">
                                        <label htmlFor="archivo" className="form-post__label">Sube tu foto</label>
                                        <input type="file" name="archivo" className="form-post__image" />
                                    </div>

                                    <input type="submit" value="Enviar" className="form-post__btn-submit" />

                                </form>

                            </div>

                        </div>

                    </aside>
                </>
            )}

        </>
    )
}

export default Sidebar
