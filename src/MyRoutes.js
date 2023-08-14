import React from 'react'
import AdminPage from './pages/AdminPage'
import EditPage from './pages/EditPage'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import Register from './components/authentiocation/Register'
import Login from './components/authentiocation/Login'

    export const ADMIN_ROUTES=[
        {
            link: '/admin',
            element: <AdminPage/>,
            id: 1,
        },
        {
            link: '/edit/:id',
            element: <EditPage/>,           // edit #2
            id: 2    
        },
    ]

    export const PUBLIC_ROUTES=[
        {
            link: '/',
            element: <HomePage/>,
            id: 1
        },
        {
            link: '/detail/:id',
            element: <DetailsPage/>,        // details #2
            id: 2
        },
        {
            link: '/register',
            element: <Register/>,
            id: 3,
        },
        {
            link: '/login',
            element: <Login/>,
            id: 4
        }
    ]

export default function MyRoutes() {
  return (
    <Routes>
        {ADMIN_ROUTES.map((item)=>
        (
         <Route path={item.link} element={item.element} key={item.id} />   
        ))}
        {PUBLIC_ROUTES.map((item)=>(
            <Route path={item.link} element={item.element} key={item.id} />
        ))}
    </Routes>
  )
}
