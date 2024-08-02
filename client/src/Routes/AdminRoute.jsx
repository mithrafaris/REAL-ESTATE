import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminSignIn from '../pages/Admin/AdminSignIn';
import AdminSignUp from '../pages/Admin/AdminSignUp';
import Dashboard from   '../pages/Admin/Dashboard' ;


function AdminRoute() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/Home" element={<Home/>} />
        <Route path="/AdminSignIn" element={<AdminSignIn/>} />
        <Route path="/AdminSignUp" element={<AdminSignUp/>} />
        <Route path='/Dashboard' element={<Dashboard/>} />
        </Routes>
    </BrowserRouter> 
  )
}

export default AdminRoute