import { GetBrandItem } from "../layouts/dashboard/pages/Brands/types";
import { GetProductItem } from "../layouts/dashboard/pages/ProductsDashboard/types";

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
    item: GetBrandItem | GetProductItem | null;
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
