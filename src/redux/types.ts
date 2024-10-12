import { GetCategoryItem } from "../layouts/dashboard/pages/CategoryDashboard/types";
export interface BasketProduct extends GetProductItem {
  subtotal: number;
  quantity: number;
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
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface GetProducts {
  data: {
    product: GetProductItem[];
    totalCount: number;
  };
}
