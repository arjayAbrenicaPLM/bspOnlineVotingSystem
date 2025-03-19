import React from 'react'
import { Navigate } from 'react-router-dom'
import Layout from './Layout'

function ProtectedRoute({setAuth, name}) {
  const isAuthenticated  = !!window.localStorage.getItem("token")
  return isAuthenticated ? <Layout setAuth={setAuth} name={name}/> : <Navigate to="/login"/>
}

export default ProtectedRoute