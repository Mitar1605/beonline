import HomePage from "../pages/homepage/HomePage"
import Auth from "../pages/auth/Auth"
import Shop from "../pages/shop/Shop"
import ProductPage from "../pages/productPage/ProductPage"
import Category from "../pages/category/Category"

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
    },
    {
        path: '/:productType/:productTitle/:productId',
        component: <ProductPage />
    },
    {
        path: '/category/:productType',
        component: <Category />
    }
]