import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import UserLogin from '../pages/User/UserSignIn';
import Home from '../pages/User/home';
import PageNotFound from '../components/PageError';
import About from '../pages/User/About';
import SignUp from '../pages/User/UserSignUp';
import ForgetPassword from '../pages/User/ForgetPassword';
import Profile from '../pages/User/Profile';
import PrivateRoute from '../components/PrivateRoute';
import AdminSignIn from '../pages/Admin/AdminSignIn';
import AdminSignUp from '../pages/Admin/AdminSignUp';
import Dashboard from '../pages/Admin/Dashboard';

const Router = createBrowserRouter([
  //user
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
  },
   //admin
   {
    path: '/AdminSignIn',
    element: <AdminSignIn/>
  },
  {
    path: '/AdminSignUp',
    element: <AdminSignUp/>
  },
  {
    path:'/Dashboard',
    element: <Dashboard/>
  }
  

]);

export default Router;
