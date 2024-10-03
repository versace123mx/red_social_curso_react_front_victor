import React from 'react'
import { Outlet } from 'react-router'
import Header from '../public/Header'

const PublicLayout = () => {
  return (
    <>
    {/*Layout*/}
    <Header />

    {/*Contenido Principal*/}
    {/*el outline dice que todo lo que esta dentro del path principal se cargara aqui*/}
    <section className="layout__content">
        <Outlet />
    </section>
    </>
  )
}

export default PublicLayout
