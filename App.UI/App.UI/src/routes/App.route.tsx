import React, { memo } from "react";
import Home from "../components/Home";
import Login from "../components/Login";
import Logout from "../components/Logout";
import PasswordReset from "../components/PasswordReset";
import Register from "../components/Register";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import NewPassword from "../components/NewPassword";
import Books from "../components/Books";
import UserProfile from "../components/UserProfile";

const token = window.localStorage.getItem('token')

const RequireAuth = ({children, redirectTo}) => {
    const isAuthenticated =  token ? true: false

    if (isAuthenticated) {
        return <Home />
    } else {
        return <Navigate to={redirectTo} />
    }
}

const routes = [
    {
      path: '/',
      element: (
        <RequireAuth redirectTo="/login">
          <Home />
        </RequireAuth>
      )
    },   
    { path: '/home', element: <Home /> }, 
    { path : '/books', element: <Books /> },
    { path: '/login', element: <Login /> },    
    { path: '/logout', element: <Logout /> },
    { path: '/passwordreset', element: <PasswordReset /> },
    { path: '/newPassword', element: <NewPassword />},
    { path: '/register', element: <Register />},
    { path: '/profile', element: <UserProfile />} 
  ]

  const router = createBrowserRouter(routes, { basename: '/' })

  const Routing = () => (
      <RouterProvider router={router} />
  )
  
  export default memo(Routing)