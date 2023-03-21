import HomePage from "../pages/homepage/HomePage"
import Auth from "../pages/auth/Auth"
import Shop from "../pages/shop/Shop"

export const authUserRoutes = [
    {
        path: '/shop',
        component: <Shop /> 
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