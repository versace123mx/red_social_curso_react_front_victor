import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataAllUser, followingUser, unfollowUser } from '../../servicios/ApiRestBlogAxios'
import { showAlert } from '../../helpers/helpers'
import Spinner2 from '../general/Spinner2'
import useAuth from '../../hooks/useAuth'
import UserList from './UserList';

const People = () => {

    const [usuarios, setUsuatrios] = useState([]);
    const [pagina, setPagina] = useState(1)
    const [loading, setloading] = useState(true)
    const [following, setFollowing] = useState([])

    const { auth, isLoading, setIsLoading, counter, setCounter } = useAuth()

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
                    ...usuarios,//aqui traigo todo el objeto anterior
                    result: [...usuarios.result, ...data.result] //aqui en usuarios.result traigo lo viejo y en data.result traigo lo nuevo
                }
            }
            setUsuatrios(newUsers)
            setloading(false)
            setFollowing(data.user_following)
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
    return (
        <>
            {loading ? <Spinner2 /> : (
                <>
                    <ToastContainer />
                    <header className="content__header">
                        <h1 className="content__title">Gente</h1>
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
            )}
        </>
    )
}

export default People
