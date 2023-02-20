import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'

export const getRouter = () => createBrowserRouter([
    {
        path : '/',
        element: <Login />
    },
    {
        path : 'auth',
        element: <Registration />
    },
    {
        path : 'home',
        element: <Home />
    },
])