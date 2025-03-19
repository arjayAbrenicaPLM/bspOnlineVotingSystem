import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Navigate, Route} from 'react-router-dom'

// Components
import Login from './components/utilities/Login'
import Dashboard from './components/main components/Dashboard'
import User from './components/main components/User'
import ProtectedRoute from './components/utilities/ProtectedRoute'

// Pages
import Results from './components/main components/Results'
import Candidates from './components/main components/Candidates'
import Voters from './components/main components/Voters'
import Settings from './components/main components/Settings'
import Voting from './components/main components/Voting'
import Stats from './components/main components/Stats'

function App() {

  const [isAuthenticated, setIsAuthenticated]  = useState()
  const [name, setName] = useState()
  const role  = window.localStorage.getItem("role")

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    setIsAuthenticated(!!token)
  },[])

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </>
        )}

        <Route element={<ProtectedRoute setAuth={setIsAuthenticated} name={name}/>}>
          <Route path="/" element={role === "Admin" ? <Navigate to="/admin"/> : 
                                  role === "Election Committee" ? <Navigate to="/committee"/> : 
                                  <Navigate to="/voting"/>} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/voters" element={role === "Admin" ? <Voters setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
          <Route path="/settings" element={role === "Admin" ? <Settings setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
          <Route path="/dashboard" element={role !== "Voting Delegate" ? <Dashboard setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
          <Route path="/voting" element={role === "Voting Delegate" ? <User setAuth={setIsAuthenticated} setName={setName}/> : <Navigate to="/" />} />
          <Route path="/ballot" element={role === "Voting Delegate" ? <Voting setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
          <Route path="/results" element={role !== "Voting Delegate" ? <Results setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
          <Route path="/candidates" element={role !== "Voting Delegate" ? <Candidates setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
          <Route path="/statistics" element={role !== "Voting Delegate" ? <Stats setAuth={setIsAuthenticated}/> : <Navigate to="/" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App