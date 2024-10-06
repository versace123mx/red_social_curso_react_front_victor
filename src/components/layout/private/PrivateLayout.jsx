import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Header from './Header'
import Sidebar from './Sidebar'
import Spinner2 from '../../general/Spinner2'
import useAuth from '../../../hooks/useAuth'

const PrivateLayout = () => {

  const { isLoading } = useAuth()
  const navigation = useNavigate()
  const validaLocalStorage = localStorage.getItem('token') //sabiendo si existe el valor de token en localstorage controlo mas que cuando se haga refresh o f5 de la misma pagina, evito que me muestre la pagina de login, solo mostrar login cuando me deslogue o cuando literal balla a / desde el mismo url y si estoy logueado me redireccionara a social

  useEffect(()=>{
      if(isLoading && validaLocalStorage == null){
        navigation('/')
      }
  },[isLoading])

  return (
    <>
      {isLoading ? <Spinner2 /> : (
        <>
          {/*Layout*/}
          <Header />

          {/*Contenido Principal*/}
          {/*el outline dice que todo lo que esta dentro del path principal se cargara aqui*/}
          <section className="layout__content">
            <Outlet />
          </section>

          {/**Barra lateral */}
          <Sidebar />
        </>

      )}

    </>
  )
}

export default PrivateLayout
