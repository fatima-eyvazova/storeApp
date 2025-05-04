export interface ProductReview {
  _id: string;
  userAvatar: string;
  description: string;
  createdAt: string;
}
export interface Review {
  _id: string;
  userAvatar: string;
  description: string;
  createdAt: string;
}

export interface Order {
  products: {
    productId: string;
  }[];

  customer: {
    userId: string;
  };
}
export interface OrdersResponse {
  data: Order[];
}
export interface ProductReviewListProps {
  reviews: Review[];
  handleReviewSubmit: (rating: number, review: string) => Promise<void>;
  isPurchased: () => boolean;
}

export interface FeedbackFormProps {
  onSubmit: (rating: number, review: string) => Promise<void>;
  isPurchased: () => boolean;
}
