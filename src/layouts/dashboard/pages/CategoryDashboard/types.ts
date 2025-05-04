export type GetCategoryItem = {
  image: {
    url: string;
    public_id: string;
  };
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  icon: string;
  description: string;
  imageUrl: string;
  title: string;
  productPrice: number;
  categoryId: string;
  // images: Array<{ url: string; public_id?: string }>;
};
export interface GetCategoriesResponse {
  data: GetCategoryItem[];
}
export interface CategoryItem {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  icon: string;
  image: {
    url: string;
    public_id: string;
  };
  description: string;
  imageUrl: string;
  title: string;
  productPrice: number;
  categoryId: string;
}
export type ImageType = {
  url: string;
  public_id: string | null;
};
export interface CategoryProps {
  list: CategoryItem[];
  // item: GetCategoryItem;
  setOpen: (bool: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface CategoryComponentProps {
  setOpen: (bool: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
}
