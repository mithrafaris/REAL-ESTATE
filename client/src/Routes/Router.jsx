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
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);

export default Router;
