import { IconButton } from "@mui/material";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/types";
import { useAddNewBasketItemMutation } from "../../../../redux/slices/shared/apiSlice";
import { basketButtonStyles } from "../../../../constants";

type Props = {
  productId: string;
  stock: number;
};

const AddToCartButton: React.FC<Props> = ({ productId, stock }) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [localQuantity, setLocalQuantity] = useState(1);
  const [addToBasket] = useAddNewBasketItemMutation();

  const handleAddToBasket = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (token && user?.role === "client") {
        try {
          await addToBasket({
            userId: user?._id,
            productId: productId,
            productCount: localQuantity,
          });
          setLocalQuantity((prev) => prev + 1);
        } catch (error) {
          console.error("Basket update error:", error);
        }
      }
    },
    [addToBasket, productId, localQuantity, token, user]
  );

  const isClient = token && user?.role === "client";
  const isProductInStock = stock > 0;

  return (
    <IconButton
      onClick={handleAddToBasket}
      sx={basketButtonStyles}
      disabled={!isClient || !isProductInStock}
    >
      <HiOutlineShoppingBag />
    </IconButton>
  );
};

export default AddToCartButton;
