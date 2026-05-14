import React from 'react'
import { Route, Routes } from "react-router-dom"
import Login from './features/pages/auth/Login'
import Register from './features/pages/auth/Register'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route />
      </Routes>
    </div>
  )
}

export default App