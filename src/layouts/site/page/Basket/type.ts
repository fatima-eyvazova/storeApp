import { GetProductItem } from "../../../../redux/types";

export type Props = {
  product: {
    _id: string;
    quantity: number;
    title: string;
    salePrice: number;
    images: { url: string }[];
    product: {
      subtotal: number;
    };
  };
  basketItem: {
    productCount: number;
    _id: string;
  };
  handleIncreaseQuantity: (productId: string, currentQuantity: number) => void;
  handleDecreaseQuantity: (productId: string, currentQuantity: number) => void;
  handleRemoveItem: (productId: string) => void;

  onRemove: (id: string) => void;
};

export interface BasketItemType {
  _id: string;
  images: string;
  productName: string;
  salePrice: number;
  productCount: number;
}
export interface User {
  _id: string;
}

export type BasketItemProps = {
  product: GetProductItem;
  _id: string;
  quantity: number;
  title: string;
  salePrice: number;
  images: {
    url: string;
  }[];
  basketItem: Props["basketItem"];
  handleIncreaseQuantity: (productId: string, currentQuantity: number) => void;
  handleDecreaseQuantity: (productId: string, currentQuantity: number) => void;
  handleRemoveItem: (productId: string) => void;
};
