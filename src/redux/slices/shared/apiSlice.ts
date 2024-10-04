import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApiUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const baseURL = `${baseApiUrl}/api/${apiKey}`;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMWViYzM5MC03Y2EwLTExZWYtODYwMS01YmFjMGM4NWMzYmEiLCJpYXQiOjE3Mjc5Nzk4MzMsImV4cCI6MTcyODA2NjIzM30.RMjEUhLn3eF-itTT2rvOqyMMiWoV41L1AoVjxfSw3I0";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<any, void>({
      query: () => "/dashboard/brands",
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation<any, { name: string; image: string }>({
      query: (category) => ({
        url: "/dashboard/brands",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      any,
      { id: string; name: string; image?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/dashboard/brands/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<any, string>({
      query: (id) => ({
        url: `/dashboard/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    getProducts: builder.query({
      query: ({ perPage = 10, page = 0, selectedBrand, searchInput }) => {
        const constructBrandQuery = selectedBrand
          ? `&brandId=${selectedBrand}`
          : "";
        const searchQuery = searchInput ? `&search=${searchInput}` : "";
        return `/dashboard/products?perPage=${perPage}&page=${
          page + 1
        }${constructBrandQuery}${searchQuery}`;
      },
    }),

    addProduct: builder.mutation<
      any,
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
      any,
      {
        id: string;
        name: string;
        price: number;
        categoryId: string;
        image?: string;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/dashboard/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/dashboard/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getOrders: builder.query<any, void>({
      query: () => "/dashboard/orders",
      providesTags: ["Order"],
    }),
    addOrder: builder.mutation<
      any,
      { productId: string; quantity: number; customerName: string }
    >({
      query: (order) => ({
        url: "/dashboard/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrder: builder.mutation<
      any,
      { id: string; productId: string; quantity: number }
    >({
      query: ({ id, ...body }) => ({
        url: `/dashboard/orders/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation<any, string>({
      query: (id) => ({
        url: `/dashboard/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = apiSlice;
