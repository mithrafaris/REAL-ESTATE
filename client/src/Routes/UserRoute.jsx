import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function UserRoute() {
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

export default UserRoute