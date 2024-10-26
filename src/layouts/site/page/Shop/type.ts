export interface Props {
  onCategorySelect: (id: string) => void;
  onRatingSelect: (rating: number) => void;
  onInStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOutStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategories: string[];
  selectedRating: number[];
  inOutStock: {
    inStock: boolean;
    outStock: boolean;
  };
  minMaxPrice: {
    min: number;
    max: number;
  };
}
