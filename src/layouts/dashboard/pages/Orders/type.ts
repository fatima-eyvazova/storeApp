export type GetOrderItem = {
  _id: string;
  customer: {
    userId: string;
    name: string;
  };
  status: string;
  products: {
    productId: string;
    productCount: number;
  }[];
  method: string;
  total: number;
  completed: null;
  createdAt: string;
  updatedAt: string;
};

export type GetOrdersData = {
  data: GetOrderItem[];
  totalCount: number;
};
