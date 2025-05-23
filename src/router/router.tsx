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
    element: (
      <InnerRouteGuard isClient={false}>
        <ProductsDashboard />
      </InnerRouteGuard>
    ),
  },
  {
    path: "auth",
    children: [
      {
        path: "",
        element: <Navigate to={ROUTES.login} />,
      },
      {
        path: ROUTES.login,
        element: (
          <AuthGuard>
            <Login />
          </AuthGuard>
        ),
      },

      {
        path: ROUTES.register,
        element: (
          <AuthGuard>
            <Register />
          </AuthGuard>
        ),
      },
    ],
  },
  {
    path: ROUTES.home,
    element: <Home />,
  },
  {
    path: ROUTES.favorites,
    element: (
      <InnerRouteGuard isClient={true}>
        <Favorites />
      </InnerRouteGuard>
    ),
  },
  {
    path: ROUTES.shop,
    element: <Shop />,
  },
  {
    path: ROUTES.analyst,
    element: <AnalyticsChart />,
  },
  {
    path: ROUTES.checkout,
    element: (
      <InnerRouteGuard isClient={true}>
        <Checkout />
      </InnerRouteGuard>
    ),
  },

  {
    path: ROUTES.category,

    element: (
      <InnerRouteGuard isClient={false}>
        <CategoryPage />
      </InnerRouteGuard>
    ),
  },
  {
    path: ROUTES.ourStaff,
    element: (
      <InnerRouteGuard isClient={false}>
        <OurStaff />
      </InnerRouteGuard>
    ),
  },
  {
    path: ROUTES.orders,
    element: (
      <InnerRouteGuard isClient={false}>
        <Orders />
      </InnerRouteGuard>
    ),
  },
  {
    path: ROUTES.productDetails,
    element: <ProductDetails />,
  },
  {
    path: ROUTES.basket,
    element: (
      <InnerRouteGuard isClient={true}>
        <Basket />
      </InnerRouteGuard>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
