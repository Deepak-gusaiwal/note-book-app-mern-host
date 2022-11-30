import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
const ProtectedRoute = () => {
    let auth = localStorage.getItem("auth")
    
  return auth ? <Outlet/> : <Navigate to="/login"/>
  
}

export default ProtectedRoute