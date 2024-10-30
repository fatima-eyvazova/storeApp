export interface ProductReviewListProps {
  reviews: [];
  handleReviewSubmit: (rating: number, review: string) => Promise<void>;
  isPurchased: boolean;
}

export interface ProductReview {
  _id: string;
  userAvatar: string;
  description: string;
  createdAt: string;
}

export interface ProductReviewListProps {
  reviews: [];
  handleReviewSubmit: (rating: number, review: string) => Promise<void>;
  isPurchased: boolean;
}

export interface FeedbackFormProps {
  onSubmit: (rating: number, review: string) => Promise<void>;
  isPurchased: boolean;
}
