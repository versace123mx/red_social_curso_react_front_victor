import React from 'react'
import avatar from '../../../assets/img/user.png'
import useAuth from '../../../hooks/useAuth'
import { NavLink } from 'react-router-dom'
import Spinner2 from '../../general/Spinner2'

const Nav = () => {

    const { auth, isLoading, setIsLoading } = useAuth()

    const handlelogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        setIsLoading(true)//se lo regreso a true ya que es su estado inicial
    }
    
    return (
        <>
            {isLoading ? <Spinner2 /> : (
                <>
                    <nav className="navbar__container-lists">

                        <ul className="container-lists__menu-list">
                            <li className="menu-list__item">
                                <NavLink to={'/social'} className="menu-list__link">
                                    <i className="fa-solid fa-house"></i>
                                    <span className="menu-list__title">Inicio</span>
                                </NavLink>
                            </li>

                            <li className="menu-list__item">
                                <NavLink to={'feed'} className="menu-list__link">
                                    <i className="fa-solid fa-list"></i>
                                    <span className="menu-list__title">Timeline</span>
                                </NavLink>
                            </li>

                            <li className="menu-list__item">
                                <NavLink to={'people'} className="menu-list__link">
                                    <i className="fa-solid fa-user"></i>
                                    <span className="menu-list__title">Gente</span>
                                </NavLink>
                            </li>

                        </ul>

                        <ul className="container-lists__list-end">
                            <li className="list-end__item">
                                <a href="#" className="list-end__link-image">
                                    <img src={auth.result && auth.result.length > 0 ? `${import.meta.env.VITE_API_URL}mostrar-imagen-nombre/${auth.result[0].imagen}` : ''} className="list-end__img" alt="Imagen de perfil" />
                                </a>
                            </li>
                            <li className="list-end__item">
                                <a href="#" className="list-end__link">
                                    <span className="list-end__name">{auth.result && auth.result.length > 0 ? auth.result[0].nick : 'no cargo bien'}</span>
                                </a>
                            </li>
                            <li className="list-end__item">
                                <NavLink to={'edition'} className="list-end__link">
                                    <i className='fa-solid fa-gear'></i>
                                    <span className="list-end__name">Ajustes</span>
                                </NavLink>
                            </li>
                            <li className="list-end__item">
                                <a href="#" className="list-end__link" onClick={handlelogout}>
                                    <i className='fa-solid fa-arrow-right-from-bracket'></i>
                                    <span className="list-end__name">Cerrar Sesion</span>
                                </a>
                            </li>
                        </ul>

                    </nav>
                </>
            )}
        </>
    )
}

export default Nav
