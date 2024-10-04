export interface ProductInfo {
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

export interface GetProductItem extends ProductInfo {
  _id: string;
  isPublish: boolean;
  isDeal: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetProducts {
  product: GetProductItem[];
  totalCount: number;
}
