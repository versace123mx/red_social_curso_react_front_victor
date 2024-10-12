import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataAllUser, followingUser, unfollowUser, userfollowing } from '../../servicios/ApiRestBlogAxios'
import { showAlert } from '../../helpers/helpers'
import Spinner2 from '../general/Spinner2'
import useAuth from '../../hooks/useAuth'
import UserList from '../user/UserList';
const Following = () => {
    const [usuarios, setUsuatrios] = useState([]);
    const [pagina, setPagina] = useState(1)
    const [loading, setloading] = useState(true)
    const [following, setFollowing] = useState([])
    const { userid } = useParams()

    const { auth, isLoading, setIsLoading, counter, setCounter } = useAuth()

    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
        showAlert('Error', 'No hay Token en la peticion', 'error')
        return
    }

    useEffect(() => {
        getUsers(1);
    }, [])

    useEffect(() => {
        //console.log('se vuelve a ejecutar en folllowing')
        setloading(true)
        getUsers(1);
        setUsuatrios([])
    }, [userid])

    const getUsers = async (next) => {

        let data = await userfollowing(token[0].token, userid, next);
        console.log('data soy data desde following', data)

        if (data.status == 'success' && data.result && data.result.length) {
            //Recorremos y limpiamor el objeto
            let newObjeto = {
                ...data,
                result: data.result.map(valor => ({
                    uid: valor.followed._id,
                    ...valor.followed
                }))
            }

            data = newObjeto
            console.log('Following manda este resultado', data)
            if (data.status == 'success') {
                let newUsers = data
                //verificamos si en el state usuarios ya hay datos, la primera vez no hay por lo cual no entra en el if
                if (usuarios && usuarios.result && usuarios.result.length >= 1) {
                    newUsers = {
                        ...usuarios,//aqui traigo todo el objeto anterior
                        result: [...usuarios.result, ...data.result] //aqui en usuarios.result traigo lo viejo y en data.result traigo lo nuevo
                    }
                }
                setUsuatrios(newUsers)
                setloading(false)
                setFollowing(data.following)
            }
        }

        if (data.status == 'success' && data.result && !data.result.length) {
            setloading(false)
        }

    };

    const showMoreUser = async () => {
        let next = pagina + 1
        setPagina(next)
        setloading(false)
        getUsers(next)
    }


    //console.log(counter)
    //console.log(following)
    //console.log(usuarios)
    return (
        <>
            {loading ? <Spinner2 /> : (
                <>
                    <ToastContainer />

                    {usuarios.result ? (
                        <>
                            <header className="content__header">
                                <h1 className="content__title">Usuarios que Sigue {usuarios && usuarios.nameUser.length ? usuarios.nameUser[0].name : ''}</h1>
                            </header>

                            <UserList
                                usuarios={usuarios}
                                setUsuatrios={setUsuatrios}
                                following={following}
                                setFollowing={setFollowing}
                                pagina={pagina}
                                setPagina={setPagina}
                            />

                            {usuarios.totalPaginas > pagina && (
                                <div className="content__container-btn">
                                    <button className="content__btn-more-post" onClick={showMoreUser}>
                                        Ver mas publicaciones
                                    </button>
                                </div>
                            )}

                        </>

                    ) : (
                        <p>No hay Seguimientos</p>
                    )}

                </>
            )}
        </>
    )
}

export default Following
