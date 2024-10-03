import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Sidebar from './Sidebar'

const PrivateLayout = () => {
  return (
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
  )
}

export default PrivateLayout
