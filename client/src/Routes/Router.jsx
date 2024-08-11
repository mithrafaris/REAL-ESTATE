import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import UserLogin from '../pages/User/UserSignIn';
import Home from '../pages/User/Home';
import PageNotFound from '../components/PageError';
import About from '../pages/User/About';
import SignUp from '../pages/User/UserSignUp';
import ForgetPassword from '../pages/User/ForgetPassword';
import Profile from '../pages/User/Profile';
import PrivateRoute from '../components/PrivateRoute';
import CreateListing from '../pages/User/Create-Listing';
import UpdateListing from '../pages/User/Update-Listing';
import Listing from '../pages/User/Listing';

const Router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <UserLogin/>
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />
  },
  { path:'/listing/:listingId', element:<Listing />},


  {
    path: "/profile",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <Profile />
      }
    ]
  },
  {
    path: "/create-listing",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <CreateListing />
      }
    ]
  },
  {
    path: "/update-listing/:listingId",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <UpdateListing />
      }
    ]
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);

export default Router;
