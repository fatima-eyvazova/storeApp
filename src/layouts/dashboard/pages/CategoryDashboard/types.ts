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
};
export interface CategoryItem {
  _id: string;
  name: string;
  icon: string;
}

export interface CategoryProps {
  list: CategoryItem[];
  setOpen: (bool: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface CategoryComponentProps {
  setOpen: (bool: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
}
