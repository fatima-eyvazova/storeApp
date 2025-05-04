import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "./routeNames";
import ProductsDashboard from "../layouts/dashboard/pages/ProductsDashboard/ProductsPage";
import CategoryPage from "../layouts/dashboard/pages/CategoryDashboard/CategoryDasbboard";
import Home from "../layouts/site/page/Home/Home";
import ProductDetails from "../layouts/site/page/Detail/Detail";
import Register from "../layouts/site/page/Auth/Register/Register";
import InnerRouteGuard from "../layouts/shared/InnerRouteGuard/InnerRouteGuard";
import AuthGuard from "../layouts/shared/InnerRouteGuard/AuthGuard";
import NotFoundPage from "../layouts/shared/NotFoundPage/NotFoundPage";
import Login from "../layouts/site/page/Auth/Login/Login";
import Shop from "../layouts/site/page/Shop/Shop";
import OurStaff from "../layouts/dashboard/pages/OurStaff/OurStaff";
import Basket from "../layouts/site/page/Basket/Basket";
import Favorites from "../layouts/site/page/Favorites/Favorites";
import Orders from "../layouts/dashboard/pages/Orders/Orders";
import Checkout from "../layouts/site/page/Checkout/Checkout";
import AnalyticsChart from "../layouts/dashboard/pages/Analytics/Analytics";
const router = createBrowserRouter([
    {
        path: ROUTES.dashboardProducts,
        element: (_jsx(InnerRouteGuard, { isClient: false, children: _jsx(ProductsDashboard, {}) })),
    },
    {
        path: "auth",
        children: [
            {
                path: "",
                element: _jsx(Navigate, { to: ROUTES.login }),
            },
            {
                path: ROUTES.login,
                element: (_jsx(AuthGuard, { children: _jsx(Login, {}) })),
            },
            {
                path: ROUTES.register,
                element: (_jsx(AuthGuard, { children: _jsx(Register, {}) })),
            },
        ],
    },
    {
        path: ROUTES.home,
        element: _jsx(Home, {}),
    },
    {
        path: ROUTES.favorites,
        element: (_jsx(InnerRouteGuard, { isClient: true, children: _jsx(Favorites, {}) })),
    },
    {
        path: ROUTES.shop,
        element: _jsx(Shop, {}),
    },
    {
        path: ROUTES.analyst,
        element: _jsx(AnalyticsChart, {}),
    },
    {
        path: ROUTES.checkout,
        element: (_jsx(InnerRouteGuard, { isClient: true, children: _jsx(Checkout, {}) })),
    },
    {
        path: ROUTES.category,
        element: (_jsx(InnerRouteGuard, { isClient: false, children: _jsx(CategoryPage, {}) })),
    },
    {
        path: ROUTES.ourStaff,
        element: (_jsx(InnerRouteGuard, { isClient: false, children: _jsx(OurStaff, {}) })),
    },
    {
        path: ROUTES.orders,
        element: (_jsx(InnerRouteGuard, { isClient: false, children: _jsx(Orders, {}) })),
    },
    {
        path: ROUTES.productDetails,
        element: _jsx(ProductDetails, {}),
    },
    {
        path: ROUTES.basket,
        element: (_jsx(InnerRouteGuard, { isClient: true, children: _jsx(Basket, {}) })),
    },
    {
        path: "*",
        element: _jsx(NotFoundPage, {}),
    },
]);
export default router;
