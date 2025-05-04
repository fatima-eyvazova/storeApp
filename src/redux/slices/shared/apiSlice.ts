import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetProductItem, GetProducts, UserProfile } from "../../types";
import {
  GetOrderItem,
  GetOrdersData,
} from "../../../layouts/dashboard/pages/Orders/type";

const baseApiUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const baseURL = `${baseApiUrl}/api/${apiKey}`;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { auth: { token?: string } };
      const token = state.auth?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Category", "Product", "Basket", "Profile", "Admin", "Order"],
  endpoints: (builder) => ({
    getCategories: builder.query<void, void>({
      query: () => "/dashboard/categories",
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation<void, { name: string; image: string }>({
      query: (category) => ({
        url: "/dashboard/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      void,
      { id: string; name: string; image?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/dashboard/categories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/dashboard/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    getProducts: builder.query({
      query: ({ perPage = 10, page = 0, selectedCategory, searchInput }) => {
        const constructCategoryQuery = selectedCategory
          ? `&categoryId=${selectedCategory}`
          : "";
        const searchQuery = searchInput ? `&search=${searchInput}` : "";
        return `/dashboard/products?perPage=${perPage}&page=${
          page + 1
        }${constructCategoryQuery}${searchQuery}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.product.map(({ id }) => ({
                type: "Product",
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    addProduct: builder.mutation<
      void,
      { name: string; price: number; categoryId: string; image: string }
    >({
      query: (product) => ({
        url: "/dashboard/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      void,
      {
        id: string;
        name: string;
        price: number;
        categoryId: string;
        images?: { url: string; public_id: string }[];
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/dashboard/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/dashboard/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getSiteProducts: builder.query<GetProducts, void>({
      query: () => "/site/products?perPage=100",
      providesTags: ["Product"],
    }),

    getProductReviews: builder.query({
      query: (id) => `/site/products/${id}/reviews`,
    }),

    getProductById: builder.query<GetProductItem, string>({
      query: (id) => `/site/products/${id}`,
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/site/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getProfile: builder.query<UserProfile, void>({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
    getSiteShop: builder.query<
      GetProducts,
      { page: number; perPage: number; filters?: string }
    >({
      query: ({ page, perPage, filters }) =>
        `/site/products?isPublish=true&page=${page}&perPage=${perPage}${
          filters || ""
        }`,
    }),
    getAdmins: builder.query({
      query: (token) => ({
        url: "/dashboard/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    addStaff: builder.mutation({
      query: (newStaff) => ({
        url: "/dashboard/register",
        method: "POST",
        body: newStaff,
      }),
    }),
    getBasketItems: builder.query({
      query: () => "/site/basket",
      providesTags: ["Basket"],
    }),

    allRemoveBasket: builder.mutation({
      query: () => ({
        url: "/site/basket/allremove",
        method: "DELETE",
      }),
      invalidatesTags: ["Basket"],
    }),

    removeBasketItem: builder.mutation({
      query: ({ id, token }) => ({
        url: `/site/basket/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Basket"],
    }),

    addNewBasketItem: builder.mutation({
      query: (basket) => ({
        url: `/site/basket`,
        method: "POST",
        body: basket,
      }),
    }),

    addRemoveFavorite: builder.mutation<unknown, unknown>({
      query: ({ product_id }) => ({
        url: "/site/products/favorites",
        method: "PUT",
        body: { product_id },
      }),
      invalidatesTags: ["Profile"],
    }),

    getOrders: builder.query<
      GetOrdersData,
      {
        perPage: number;
        page: number;
        startDate?: string;
        endDate?: string;
        search?: string;
        status?: string;
      }
    >({
      query: ({ perPage, page, startDate, endDate, search, status }) => {
        let constructedQuery = `/dashboard/orders?perPage=${perPage}&page=${page}`;

        if (startDate) constructedQuery += `&startDate=${startDate}`;
        if (endDate) constructedQuery += `&endDate=${endDate}`;
        if (search) constructedQuery += `&search=${search}`;
        if (status) constructedQuery += `&status=${status}`;

        return constructedQuery;
      },
      providesTags: ["Order"],
    }),

    updateOrderStatus: builder.mutation<
      GetOrderItem,
      { orderId: string; status: string }
    >({
      query: ({ orderId, status }) => ({
        url: `/dashboard/orders/${orderId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/site/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    giveFeedback: builder.mutation({
      query: (feedbackData) => ({
        url: "/site/products/feedback",
        method: "POST",
        body: feedbackData,
      }),
    }),

    getSiteInfo: builder.query({
      query: () => "/dashboard/site-info",
    }),
    updateSiteInfo: builder.mutation({
      query: (siteInfo) => ({
        url: "/dashboard/site-info",
        method: "PUT",
        body: siteInfo,
      }),
    }),
    deleteUser: builder.mutation<void, { user_id: string }>({
      query: ({ user_id }) => ({
        url: `/dashboard/users/${user_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddNewBasketItemMutation,
  useGetSiteProductsQuery,
  useGetProductByIdQuery,
  useAddRemoveFavoriteMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useAddStaffMutation,
  useGetProfileQuery,
  useGetAdminsQuery,
  useGetSiteShopQuery,
  useGetBasketItemsQuery,
  useRemoveBasketItemMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useCreateOrderMutation,
  useGiveFeedbackMutation,
  useGetSiteInfoQuery,
  useUpdateSiteInfoMutation,
  useGetProductReviewsQuery,
  useAllRemoveBasketMutation,
} = apiSlice;
