import React, { useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import Spinner2 from '../../general/Spinner2'

const Sidebar = () => {

    const { auth, isLoading, setIsLoading, counter } = useAuth()//esto lo traemos del hook useAuth que se trae los datos del context

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
                                        <a href="#" className="container-names__name">{auth.result && auth.result.length > 0 ? auth.result[0].name : 'no cargo bien'}</a>
                                        <p className="container-names__nickname">{auth.result && auth.result.length > 0 ? auth.result[0].nick : 'no cargo bien'}</p>
                                    </div>
                                </div>

                                <div className="profile-info__stats">

                                    <div className="stats__following">
                                        <a href="#" className="following__link">
                                            <span className="following__title">Siguiendo</span>
                                            <span className="following__number">{counter.result && counter.result.length > 0 ? counter.result[0].following : 0}</span>
                                        </a>
                                    </div>
                                    <div className="stats__following">
                                        <a href="#" className="following__link">
                                            <span className="following__title">Seguidores</span>
                                            <span className="following__number">{counter.result && counter.result.length > 0 ? counter.result[0].followed : 0}</span>
                                        </a>
                                    </div>


                                    <div className="stats__following">
                                        <a href="#" className="following__link">
                                            <span className="following__title">Publicaciones</span>
                                            <span className="following__number">{counter.result && counter.result.length > 0 ? counter.result[0].publications : 0}</span>
                                        </a>
                                    </div>


                                </div>
                            </div>


                            <div className="aside__container-form">

                                <form className="container-form__form-post">

                                    <div className="form-post__inputs">
                                        <label htmlFor="post" className="form-post__label">¿Que estas pesando hoy?</label>
                                        <textarea name="post" className="form-post__textarea"></textarea>
                                    </div>

                                    <div className="form-post__inputs">
                                        <label htmlFor="image" className="form-post__label">Sube tu foto</label>
                                        <input type="file" name="image" className="form-post__image" />
                                    </div>

                                    <input type="submit" value="Enviar" className="form-post__btn-submit" disabled />

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
