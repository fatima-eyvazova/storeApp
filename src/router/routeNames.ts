export const ROUTES = {
  home: "/",
  products: "/products",
  productDetails: "/products/:id",
  login: "/auth/login",
  register: "/auth/register",
  wishlist: "wishlist",
  basket: "basket",
  checkout: "checkout",
  layout: "layout",
  dashboardProducts: "/dashboard/products",
  productItem: "/dashboard/products/:id",
  category: "/dashboard/category",
} as const;
