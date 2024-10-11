import React, { useEffect, useState } from 'react'
import avatar from '../../assets/img/user.png'
import { useParams } from 'react-router'
import { getDataUserForId, getDataCounter } from '../../servicios/ApiRestBlogAxios'
import Spinner2 from '../general/Spinner2'
import { Link } from 'react-router-dom'

const Profile = () => {

    const [loading, setloading] = useState(true)
    const [user, setUser] = useState()
    const { userid } = useParams()
    const [contador, setContador] = useState([])

    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
        showAlert('Error', 'No hay Token en la peticion', 'error')
        return
    }

    useEffect(() => {

        const getDataUser = async (toknen, id) => {
            const result = await getDataUserForId(token[0].token, userid)
            if (result.status == 'success') {
                const contadordeFollows = await getDataCounter(token[0].token, userid)
                setUser(result.result)
                setloading(false)
                setContador(contadordeFollows)
            }
        }

        getDataUser()
    }, [userid])

    return (
        <>
            {loading ? <Spinner2 /> : (
                <>
                    <header className="content__header">
                        <h1 className="content__title">Bienvenid@</h1>
                    </header>

                    <div className="aside__profile-info">

                        <div className="profile-info__general-info">
                            <div className="general-info__container-avatar">
                                <img src={`${import.meta.env.VITE_API_URL}mostrar-imagen-nombre/${user[0].imagen}`} className="post__user-image" alt="Foto de perfil" />
                            </div>

                            <div className="general-info__container-names">
                                <p className="container-names__name">{user[0].name} {user[0].surnombre}</p>
                                <p className="container-names__nickname">@{user[0].nick}</p>
                            </div>
                        </div>

                        <div className="profile-info__stats">

                            <div className="stats__following">
                                <Link to={contador && contador.result && contador.result.length ? `/social/siguiendo/${contador.result[0].userId}` : ''} className="following__link">
                                    <span className="following__title">Siguiendo</span>
                                    <span className="following__number">{contador && contador.result && contador.result.length ? contador.result[0].following : 0}</span>
                                </Link>
                            </div>
                            <div className="stats__following">
                                <Link to={contador && contador.result && contador.result.length ? `/social/seguidores/${contador.result[0].userId}` : ''} className="following__link">
                                    <span className="following__title">Seguidores</span>
                                    <span className="following__number">{contador && contador.result && contador.result.length ? contador.result[0].followed : 0}</span>
                                </Link>
                            </div>


                            <div className="stats__following">
                                <Link to={contador && contador.result && contador.result.length ? `` : ''} className="following__link">
                                    <span className="following__title">Publicaciones</span>
                                    <span className="following__number">{contador && contador.result && contador.result.length ? contador.result[0].publications : 0}</span>
                                </Link>
                            </div>
                            <div className="stats__following">
                                <button className="content__button">Seguir</button>
                            </div>

                        </div>
                    </div>

                    <div className="content__posts">

                        <article className="posts__post">

                            <div className="post__container">

                                <div className="post__image-user">
                                    <a href="#" className="post__image-link">
                                        <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                                    </a>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <a href="#" className="user-info__name">Victor Robles</a>
                                        <span className="user-info__divider"> | </span>
                                        <a href="#" className="user-info__create-date">Hace 1 hora</a>
                                    </div>

                                    <h4 className="post__content">Hola, buenos dias.</h4>

                                </div>

                            </div>


                            <div className="post__buttons">

                                <a href="#" className="post__button">
                                    <i className="fa-solid fa-trash-can"></i>
                                </a>

                            </div>

                        </article>

                    </div>

                    <div className="content__container-btn">
                        <button className="content__btn-more-post">
                            Ver mas publicaciones
                        </button>
                    </div>

                </>
            )}

        </>
    )
}

export default Profile
