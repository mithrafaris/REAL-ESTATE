import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import UserLogin from '../pages/User/UserSignIn';
import Home from '../pages/User/home';
import PageNotFound from '../componts/PageError';
import About from '../pages/User/About';
import SignUp from '../pages/User/UserSignUp';
import ForgetPassword from '../pages/User/ForgetPassword';
import Profile from '../pages/User/Profile';
import PrivateRoute from '../componts/PrivateRoute';

const Router = createBrowserRouter([
  {
    path: "/*",
    element: <PageNotFound />,
  },
  {
    path: "/SignIn",
    element: <UserLogin />
  },
  {
    path: "/Home",
    element: <Home />
  },
  {
    path: "/About",
    element: <About />
  },
  {
    path: "/SignUp",
    element: <SignUp />
  },
  {
    path: '/ForgotPassword',
    element: <ForgetPassword />
  },
  {
    path: "/Profile",
    element: <PrivateRoute />, 
    children: [
      {
        path: "",
        element: <Profile />
      }
    ]
  }
]);

export default Router;
