import React from 'react'
import { Outlet } from 'react-router-dom'
import RegisterPage from '../Pages/RegisterPage/RegisterPage.jsx'

const PrivateRoute = () => {
    const auth = true;

  return auth ? <Outlet /> : <RegisterPage />
}

export default PrivateRoute
