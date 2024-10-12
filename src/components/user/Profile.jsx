import React, { useEffect, useState } from 'react'
import avatar from '../../assets/img/user.png'
import { useParams } from 'react-router'
import { getDataUserForId, getDataCounter, followingUser, unfollowUser, getPublicationsForId } from '../../servicios/ApiRestBlogAxios'
import Spinner2 from '../general/Spinner2'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTimeAgo from 'react-time-ago'

const Profile = () => {

    const { auth, isLoading, setIsLoading, counter, setCounter } = useAuth()
    const [loading, setloading] = useState(true)
    const [user, setUser] = useState()
    const { userid } = useParams()
    const [contador, setContador] = useState([])
    const [following, setFollowing] = useState([])
    const [publications, setPublications] = useState([])

    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
        showAlert('Error', 'No hay Token en la peticion', 'error')
        return
    }

    useEffect(() => {

        getDataUser()
        getPublicationUser(1)
    }, [userid, following])

    const getDataUser = async (toknen, id) => {
        const result = await getDataUserForId(token[0].token, userid)
        if (result.status == 'success') {
            const contadordeFollows = await getDataCounter(token[0].token, userid)
            setUser(result.result)
            setContador(contadordeFollows)
            setloading(false)
        }
    }

    const follow = async (e, id) => {
        e.preventDefault()
        const data = {
            "idfolow": id
        }
        const result = await followingUser(data, token[0].token)
        if (result.status == 'success') {
            setFollowing([
                ...following, id
            ])

            //actualizar contadores
            //setCounter()
            toast.success(`🦄 Haz seguido al usuario`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

            //modificacion del objeto para incrementarlo en 1
            const newContadorUserLogin = {
                ...counter,
                result: counter.result.map((item, index) =>
                    index === 0 ? { ...item, following: item.following + 1 } : item // Modificar solo el primer objeto
                )
            }
            setCounter(newContadorUserLogin)
        }

        if (result.status == 'error') {
            toast.error('🦄 Wow so easy!', {
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

    const unfollow = async (e, id) => {
        e.preventDefault()

        const result = await unfollowUser(id, token[0].token)
        //console.log(result)
        if (result.status == 'success') {

            const newFollowing = following.filter(following => following != id)
            //console.log('nuevos', newFollowing)

            setFollowing(newFollowing)

            //actualizar contadores
            //setCounter()
            toast.success(`🦄 Haz dejado de seguir al usuario`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

            //modificacion del objeto para incrementarlo en 1
            const newContadorUserLogin = {
                ...counter,
                result: counter.result.map((item, index) =>
                    index === 0 ? { ...item, following: item.following - 1 } : item // Modificar solo el primer objeto
                )
            }
            setCounter(newContadorUserLogin)
        }

        if (result.status == 'error') {
            toast.error('🦄 Wow so easy!', {
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

    const getPublicationUser = async (pagina) => {
        const result = await getPublicationsForId(token[0].token, userid, pagina)
        if (result.status == 'success') {
            setPublications(result.result)
        }
    }

    console.log('desde profile method auth', auth)
    console.log('desde profile method user', user)
    console.log(counter)
    console.log('publicaciones', publications)

    return (
        <>
            {loading ? <Spinner2 /> : (
                <>
                    <ToastContainer />
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
                            {user[0].uid != auth.result[0].uid && (

                                <div className="stats__following">
                                    {user && user.length && user[2].followe_me.includes(auth.result[0].uid) ? (
                                        <button className="content__button post__button--red" onClick={(e) => unfollow(e, user[0].uid)}>Dejar de Seguir</button>
                                    ) : (
                                        <button className="content__button" onClick={(e) => follow(e, user[0].uid)}>Seguir</button>
                                    )}



                                </div>
                            )}


                        </div>
                    </div>

                    <div className="content__posts">
                        {publications.map(publicacion => (
                            <article className="posts__post" key={publicacion.uid}>

                                <div className="post__container">

                                    <div className="post__image-user">
                                        <a href="#" className="post__image-link">
                                            <img src={`${import.meta.env.VITE_API_URL}publication/show-image-publication/${publicacion.file}`} className="post__user-image" alt="Foto de perfil" />
                                        </a>
                                    </div>

                                    <div className="post__body">

                                        <div className="post__user-info">
                                            <a href="#" className="user-info__name">{publicacion.text}</a>
                                            <span className="user-info__divider"> | </span>
                                            <a href="#" className="user-info__create-date"><ReactTimeAgo date={Date.parse(publicacion.create_at)} locale="en-GB" /> </a>
                                        </div>

                                        <h4 className="post__content">Hola, buenos dias.</h4>

                                    </div>

                                </div>

                                {auth.result[0].uid === user[0].uid && (
                                    <div className="post__buttons">

                                        <a href="#" className="post__button">
                                            <i className="fa-solid fa-trash-can"></i>
                                        </a>

                                    </div>

                                )}


                            </article>

                        ))}


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
