import { createBrowserRouter } from "react-router-dom";

//
import { ROUTES } from "./routeNames";
import ProductsDashboard from "../layouts/dashboard/pages/ProductsDashboard/ProductsPage";
import CategoryPage from "../layouts/dashboard/pages/CategoryDashboard/CategoryDasbboard";
import Home from "../layouts/site/page/Home/Home";
import ProductDetails from "../layouts/site/page/Detail/Detail";
const router = createBrowserRouter([
  {
    path: ROUTES.dashboardProducts,
    element: <ProductsDashboard />,
  },
  {
    path: ROUTES.home,
    element: <Home />,
  },

  {
    path: ROUTES.category,
    element: <CategoryPage />,
  },

  {
    path: ROUTES.productDetails,
    element: <ProductDetails />,
  },
]);

export default router;
