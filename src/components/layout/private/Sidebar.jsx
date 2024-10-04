import React from 'react'
import avatar from '../../../assets/img/user.png'
import useAuth from '../../../hooks/useAuth'

const Sidebar = () => {

    const {auth} = useAuth()//esto lo traemos del hook useAuth que se trae los datos del context
    console.log(auth)
    console.log(auth.result[0].name)
    return (
        <>
            <aside className="layout__aside">

                <header className="aside__header">
                    <h1 className="aside__title">Hola, {auth.result[0].name}</h1>
                </header>

                <div className="aside__container">

                    <div className="aside__profile-info">

                        <div className="profile-info__general-info">
                            <div className="general-info__container-avatar">
                                <img src={`${import.meta.env.VITE_API_URL}mostrar-imagen-nombre/${auth.result[0].imagen}`} className="container-avatar__img" alt="Foto de perfil" />
                            </div>

                            <div className="general-info__container-names">
                                <a href="#" className="container-names__name">{auth.result[0].name}</a>
                                <p className="container-names__nickname">{auth.result[0].surname}</p>
                            </div>
                        </div>

                        <div className="profile-info__stats">

                            <div className="stats__following">
                                <a href="#" className="following__link">
                                    <span className="following__title">Siguiendo</span>
                                    <span className="following__number">10</span>
                                </a>
                            </div>
                            <div className="stats__following">
                                <a href="#" className="following__link">
                                    <span className="following__title">Seguidores</span>
                                    <span className="following__number">13</span>
                                </a>
                            </div>


                            <div className="stats__following">
                                <a href="#" className="following__link">
                                    <span className="following__title">Publicaciones</span>
                                    <span className="following__number">17</span>
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
    )
}

export default Sidebar
