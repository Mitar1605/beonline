import HomePage from "../pages/homepage/HomePage"
import Auth from "../pages/auth/Auth"

export const authUserRoutes = [
    {
        path: '/',
        component: <HomePage /> 
    }
]

export const guestRoutes = [
    {
        path: '/',
        component: <HomePage /> 
    },
    {
        path: '/auth',
        component: <Auth />
    }
]