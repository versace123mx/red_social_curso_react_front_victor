import React, { useEffect, useState } from 'react'
import avatar from '../../assets/img/user.png'
import useAuth from '../../hooks/useAuth'
import { getDataAllUser } from '../../servicios/ApiRestBlogAxios'
import { showAlert } from '../../helpers/helpers'
import { useParams } from 'react-router'
import Spinner2 from '../general/Spinner2'
import { Link } from 'react-router-dom'

const People = () => {

    const [usuarios, setUsuatrios] = useState([]);
    const [pagina, setPagina] = useState(1)
    const [loading, setloading] = useState(true)

    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
        showAlert('Error', 'No hay Token en la peticion', 'error')
        return
    }

    useEffect(() => {
        getUsers(1);
    }, [])

    const getUsers = async (next) => {

        const data = await getDataAllUser(token[0].token, next);
        if (data.status == 'success') {
            let newUsers = data
            //verificamos si en el state usuarios ya hay datos, la primera vez no hay por lo cual no entra en el if
            if (usuarios && usuarios.result && usuarios.result.length >= 1) {
                newUsers = {
                    ...usuarios,//aqui traigo todo el objeto nuevo
                    result: [...usuarios.result, ...data.result] //aqui en usuarios.result traigo lo viejo y en data.result traigo lo nuevo
                }
            }
            setUsuatrios(newUsers)
            setloading(false)
        }

    };

    const showMoreUser = async () => {
        let next = pagina + 1
        setPagina(next)
        setloading(false)
        getUsers(next)
    }
    console.log(usuarios.totalPaginas)
    return (
        <>
            {loading ? <Spinner2 /> : (
                <>
                    <header className="content__header">
                        <h1 className="content__title">Gente</h1>
                    </header>
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

                                    <a href="#" className="post__button" >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </a>

                                </div>

                            </article>
                        ))}
                    </div>

                    {usuarios.totalPaginas > pagina && (

                        <div className="content__container-btn">
                            <button className="content__btn-more-post" onClick={showMoreUser}>
                                Ver mas publicaciones
                            </button>
                        </div>

                    )}



                </>
            )}
        </>
    )
}

export default People
