import { GetCategoryItem } from "../layouts/dashboard/pages/CategoryDashboard/types";
export interface BasketProduct extends GetProductItem {
  subtotal: number;
  quantity: number;
  productCount: number;
  productName: string;
}

export type Profile = {
  token: string;
  user: {
    _id: string;
    organizationId: string;
    name: string;
    surname: string;
    email: string;
    role: "superadmin" | "admin" | "client";
  } | null;
};

export type SelectedItemDashboard = {
  itemData: {
    item: GetCategoryItem | GetProductItem | null;
    status: "view" | "edit" | "delete" | "";
  };
};

export type RootState = {
  basket: {
    basketProducts: BasketProduct[];
    total: number;
  };
  wishList: {
    wishListProducts: GetProductItem[];
  };
  auth: Profile;
  selectedItem: SelectedItemDashboard;
};

export interface GetProductItem {
  image: {
    url: string;
    public_id: string;
  };
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  title: string;
  productPrice: number;
  salePrice?: number;
  images: Array<{ url: string; public_id?: string }>;
  stock: number;
  rating: {
    avgRating: number;
    overallRatingCount: number;
  };
}

export type FavoriteProduct = {
  id: string;
  title: string;
  price: number;
};

export type UserProfile = {
  user: {
    id: string;
    name: string;
    email: string;
    favorites: FavoriteProduct[];
  };
};
export interface GetAddProductItem {
  categoryId: string;
  isPublish: boolean;
  image: {
    url: string;
    public_id: string;
  };
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  title: string;
  productPrice: number;
  salePrice?: number;
  images: Array<{ url: string; public_id?: string }>;
  stock: number;
  rating: {
    avgRating: number;
    overallRatingCount: number;
  };
}

export interface GetProducts {
  data: {
    product: GetProductItem[];
    totalCount: number;
  };
}
