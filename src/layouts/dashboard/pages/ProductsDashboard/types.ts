import { Dispatch, SetStateAction } from "react";

export interface ProductInfo {
  title: string;
  description: string;
  productPrice: number;
  salePrice?: number;
  categoryId: string;
  stock: number;
  images:
    | {
        url: string;
        public_id: string;
      }[]
    | File[];
}

export interface GetProductItem extends ProductInfo {
  _id: string;
  title: string;
  isPublish: boolean;
  isDeal: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetProducts {
  product: GetProductItem[];
  totalCount: number;
}

export interface Props {
  title: string;
  description: string;
  productPrice: number;
  salePrice?: number;
  categoryId: string;
  brandName?: string;
  stock: number;
  images:
    | {
        url: string;
        public_id: string;
      }[]
    | File[];
}

export interface Props {
  setOpen: (bool: boolean) => void;
  // setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
  onAddProduct: () => void;
}

export interface ProductData {
  images:
    | {
        url: string;
        public_id: string;
      }[]
    | File[];
  id?: string;
  name?: string;
  price?: number;
  categoryId?: string;
  image?: string | undefined;
}

export type PropsItem = {
  item: GetProductItem;
  selectedItems: string[];
  handleCheckboxChange: (itemId: string) => void;
  setOpen: (bool: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteProduct: (id: string) => Promise<void>;
};

export interface PropsProductsTable {
  list: GetProductItem[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  totalCount: number;
  page: number;
  perPage: number;
  setOpen: (open: boolean) => void;
  onDeleteProduct: (id: string) => void;
  handleCheckboxChange: (id: string) => void;
  selectCheckboxes: () => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categories: unknown;
}

export interface PropsAddProduct {
  setOpen: Dispatch<SetStateAction<boolean>>;
  categoriesListData: {
    data: {
      _id: string;
      name: string;
    }[];
  };
  selectedImages: { url: string; public_id: string }[];
  err: string;
  setErr: Dispatch<SetStateAction<string>>;
  handleFormSubmit: (values: ProductData) => Promise<void>;
  setSelectedImages: Dispatch<SetStateAction<string[]>>;
}

export interface ProductFormValues {
  title: string;
  description: string;
  categoryId: string;
  stock: string;
  images: File[];
  salePrice: string;
  productPrice: string;
  isPublish: boolean;
}
