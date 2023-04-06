import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Home } from '../components/pages/Home';
import { Login } from '../components/pages/Login';
import { NotFound } from '../components/pages/NotFound';
import { Profile } from '../components/pages/Profile';
import { Register } from '../components/pages/Register';
import { Menu } from '../components/layout/Menu';

export const Router = ({ user, setUser }) => {

  return (
    <BrowserRouter>
      <div className='header'>
        <Menu user={user} setUser={setUser} />
      </div>

      <div className='body'>
        <Routes>
          <Route path='/' element={<Home user={user} />} />
          <Route path='/home' element={<Navigate to='/' />} />

          <Route path='/login' element={Object.keys(user).length > 0 ? <Navigate replace to='/home' /> : <Login user={user} setUser={setUser} />} />
          <Route path='/register' element={Object.keys(user).length > 0 ? <Navigate replace to='/home' /> : <Register />} />

          <Route path='/profile/:user' element={<Profile />} />
          <Route path='/profile/:user/:page' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

      <div className='footer'>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
