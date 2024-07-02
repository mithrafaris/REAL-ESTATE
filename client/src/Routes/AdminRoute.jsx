import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AdminRoute() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        </Routes>
    </BrowserRouter> 
  )
}

export default AdminRoute