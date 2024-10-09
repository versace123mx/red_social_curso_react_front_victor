import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import PublicLayout from '../components/layout/public/PublicLayout'
import Login from '../components/user/Login'
import Register from '../components/user/Register'
import PrivateLayout from '../components/layout/private/PrivateLayout'
import Feed from '../components/publication/Feed'
import Error404 from '../components/layout/public/Error404'
import { AuthProvider } from '../context/AuthProvider'
import People from '../components/user/People'
import EditProfile from '../components/user/EditProfile'
import Following from '../components/follow/Following'
import Followers from '../components/follow/Followers'

const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
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
            <Route path='feed' element={<Feed />} />{/*Este componente carga al entrar a /social/feet */}
            <Route path='people' element={<People />} />
            <Route path='edition' element={<EditProfile />} />
            <Route path='siguiendo/:userid' element={<Following />} />
            <Route path='seguidores/:userid' element={<Followers />} />
            <Route path='*' element={<Error404 />} />
          </Route>

          <Route path='*' element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routing
