import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import UserLogin from '../pages/User/UserSignIn';
import AdminSignIn from '../pages/Admin/AdminSignIn';
import AdminSignUp from '../pages/Admin/AdminSignUp';
import Dashboard from '../pages/Admin/Dashboard';
import Home from '../pages/User/home';
import PageNotFound from '../components/PageError';
import About from '../pages/User/About';
import SignUp from '../pages/User/UserSignUp';
import ForgetPassword from '../pages/User/ForgetPassword';
import Profile from '../pages/User/Profile';
import PrivateRoute from '../components/PrivateRoute';
import CreateListing from '../pages/User/CreateListing';

const Router = createBrowserRouter([
  // user routes
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
    path: "/ForgotPassword",
    element: <ForgetPassword />
  },
  {
    path: "/CreateListing",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <CreateListing />
      }
    ]
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

  // admin routes
  {
    path: "/AdminSignIn",
    element: <AdminSignIn />
  },
  {
    path: "/AdminSignUp",
    element: <AdminSignUp />
  },
  {
    path: "/Dashboard",
    element: <Dashboard />
  },

  // catch-all route for 404
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);

export default Router;
