import React from 'react'
import { Link } from 'react-router-dom'
import { getDataAllUser, followingUser, unfollowUser } from '../../servicios/ApiRestBlogAxios'
import { showAlert } from '../../helpers/helpers'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserList = ({usuarios,following,setFollowing}) => {

    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
        showAlert('Error', 'No hay Token en la peticion', 'error')
        return
    }

    const follow = async (e,id) => {
        e.preventDefault()
        const data = {
            "idfolow":id
        }
        const result = await followingUser( data ,token[0].token )
        if(result.status == 'success'){
            setFollowing([
                ...following,id
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
        }

        if(result.status=='error'){
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

    const unfollow = async (e,id)=>{
        e.preventDefault()

        const result = await unfollowUser(id,token[0].token)
        console.log(result)
        if(result.status == 'success'){

            const newFollowing = following.filter( following => following != id)
            console.log('nuevos',newFollowing)
        
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
        }

        if(result.status=='error'){
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

    return (
        <div className="content__posts" >
            {usuarios.result.map(usuario => (
                <article className="posts__post" key={usuario.uid}>

                    <div className="post__container">

                        <div className="post__image-user">
                            <Link to={''} className="post__image-link">
                                <img src={`${import.meta.env.VITE_API_URL}mostrar-imagen-nombre/${usuario.imagen}`} className="post__user-image" alt="Foto de perfil" />
                            </Link>
                        </div>

                        <div className="post__body">

                            <div className="post__user-info">
                                <Link to={''} className="user-info__name">{usuario.name} {usuario.surname}</Link>
                            </div>
                            <div className="post__user-info">
                                <Link to={''} className="user-info__name">@{usuario.nick}</Link>
                            </div>
                            <h4 className="post__content">{usuario.bio}</h4>

                        </div>

                    </div>


                    <div className="post__buttons">

                        {!following.includes(usuario.uid) && (
                            <a href="#" className="post__button post__button--green" onClick={(e) => follow(e, usuario.uid)}>
                                seguir
                            </a>
                        )}

                        {following.includes(usuario.uid) && (
                            <a href="#" className="post__button post__button--red" onClick={(e) => unfollow(e, usuario.uid)}>
                                dejar de seguir
                            </a>
                        )}
                    </div>

                </article>
            ))}
        </div>
    )
}

export default UserList
