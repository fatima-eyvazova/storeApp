import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAddRemoveFavoriteMutation } from "../../../../redux/slices/shared/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/types";
import React, { useState } from "react";

type FavoriteButtonProps = {
  productId: string;
  isFavorite: boolean;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  productId,
  isFavorite,
}) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [addRemoveFavorite] = useAddRemoveFavoriteMutation();
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const isClient = token && user?.role === "client";

  const handleFavoriteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isClient) return;
    setIsFavoriteState((prev) => !prev);
    addRemoveFavorite({ product_id: productId });
  };

  return (
    <div
      onClick={handleFavoriteClick}
      style={{ cursor: isClient ? "pointer" : "not-allowed" }}
    >
      {isFavoriteState ? (
        <FaHeart style={{ color: "red", fontSize: 20 }} />
      ) : (
        <FaRegHeart style={{ color: "black", fontSize: 20 }} />
      )}
    </div>
  );
};

export default FavoriteButton;
