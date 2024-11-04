import { BasketProduct, GetProductItem } from "../../../../redux/types";

export type Props = {
  product: GetProductItem;
  basketItem?: BasketProduct[];
  favs: GetProductItem[];
  refetchFavorites: () => void;
  key: string;
};

export interface SwiperProductsProps {
  products: {
    data: {
      product: GetProductItem[];
    };
  };
  favs: GetProductItem[];
}
