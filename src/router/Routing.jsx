import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import PublicLayout from '../components/layout/public/PublicLayout'
import Login from '../components/user/Login'
import Register from '../components/user/Register'
import PrivateLayout from '../components/layout/private/PrivateLayout'
import Feed from '../components/publication/Feed'
import Error404 from '../components/layout/public/Error404'

const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<PublicLayout />} >{/*Carga la barra de header en todo momento ya que este es el contenedor principal*/}
                <Route index element={<Login />} />
                <Route path='login' element={<Login />} />
                <Route path='registro' element={<Register />} />
                <Route path='*' element={<Error404 />} />
            </Route>

            {/**Aqui van las rutas privadas */}
            <Route path='/social' element={<PrivateLayout />}> 
              <Route index element={<Feed />} /> {/*Este componente carga al entrar a /social */}
              <Route path='feet' element={<Feed />} />{/*Este componente carga al entrar a /social/feet */}
              <Route path='*' element={<Error404 />} />
            </Route>

            <Route path='*' element={<Error404 />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routing
