import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function UserRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route element={<PrivateRoute />}>
        <Route path="/Profile" element={<Profile />} />
        <Route path="/CreateListing" element={<CreateListing/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default UserRoute;
