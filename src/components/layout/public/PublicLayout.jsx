import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Header from '../public/Header'
import useAuth from '../../../hooks/useAuth'
import Spinner2 from '../../general/Spinner2'

const PublicLayout = () => {

  const { auth, isLoading } = useAuth()
  const navigation = useNavigate()

  useEffect(() => {
    //si es falso isLoading por que cuando es falso es cuando todo cargo y si existe auth lo redirecciono osea el usuario esta logueado
    if (!isLoading && auth.result && auth.result.length > 0) {
      navigation('/social/');
    }
  }, [isLoading]);

  return (
    <>
      {!isLoading ? <Spinner2 /> : (
        <>
          {/*Layout*/}
          <Header />

          {/*Contenido Principal*/}
          {/*el outline dice que todo lo que esta dentro del path principal se cargara aqui*/}
          <section className="layout__content">
            <Outlet />
          </section>
        </>

      )}

    </>
  )
}

export default PublicLayout
