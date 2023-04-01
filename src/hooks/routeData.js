import HomePage from "../pages/homepage/HomePage"
import Auth from "../pages/auth/Auth"
import Shop from "../pages/shop/Shop"
import ProductPage from "../pages/productPage/ProductPage"
import Category from "../pages/category/Category"
import AdminPanel from "../pages/admin/AdminPanel"

export const authUserRoutes = [
    {
        path: '/shop',
        component: <Shop /> 
    },
    {
        path: '/admin-panel',
        component: <AdminPanel /> 
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