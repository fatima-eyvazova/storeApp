import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

import React, { useCallback, useState } from "react";
import {
  BasketProduct,
  GetProductItem,
  RootState,
} from "../../../../redux/types";
import {
  useAddNewBasketItemMutation,
  useAddRemoveFavoriteMutation,
} from "../../../../redux/slices/shared/apiSlice";
import {
  basketButtonStyles,
  heartIconContainerStyles,
  productCardStyles,
  productImageStyles,
  productInfo,
  productPriceCartStyles,
  productPriceInfo,
  productTitle,
} from "../../../../constants";

type Props = {
  product: GetProductItem;
  basketItem?: BasketProduct[];
  favs: GetProductItem[];
  refetchFavorites: () => void;
  key: string;
};

const ProductCard = React.memo(({ product, favs }: Props) => {
  const { _id: id, title, productPrice, salePrice, images, stock } = product;
  const { token, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [localQuantity, setLocalQuantity] = useState(1);

  const [addToBasket] = useAddNewBasketItemMutation();
  const rating = product?.rating;

  const [addRemoveFavorite, { isLoading }] = useAddRemoveFavoriteMutation();

  const favorite = favs?.find((pr) => pr?._id === product?._id);
  const [isFavorite, setIsFavorite] = useState(!!favorite);

  const handleAddToBasket = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (token && user?.role === "client") {
        try {
          await addToBasket({
            userId: user?._id,
            productId: id,
            productCount: localQuantity,
          });

          setLocalQuantity((prev) => prev + 1);
        } catch (error) {
          console.error("Basket update error:", error);
        }
      }
    },
    [addToBasket, id, localQuantity, token, user]
  );

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  const handleFavoriteClick = (e: React.ChangeEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isClient) return;
    setIsFavorite((prev) => !prev);
    addRemoveFavorite({
      product_id: id,
    });
  };

  const calculateAverageRating = () => {
    const { avgRating, overallRatingCount } = rating;
    return overallRatingCount > 0 ? avgRating : 0;
  };

  const isClient = token && user?.role === "client";
  const isProductInStock = stock > 0;

  return (
    <Box onClick={handleClick} sx={productCardStyles} disabled={isLoading}>
      <Box sx={{ overflow: "hidden", backgroundColor: "#fff" }}>
        {images && images.length > 0 && (
          <Box
            component="img"
            src={images[0].url}
            alt="product-image"
            sx={productImageStyles}
          />
        )}
      </Box>

      <Box sx={heartIconContainerStyles}>
        <Box onClick={handleFavoriteClick} disabled={!isClient}>
          {isFavorite ? (
            <FaHeart
              style={{
                color: isClient ? "red" : "grey",
                fontSize: 20,
                cursor: isClient ? "pointer" : "not-allowed",
              }}
            />
          ) : (
            <FaRegHeart
              style={{
                color: isClient ? "black" : "grey",
                fontSize: 20,
                cursor: isClient ? "pointer" : "not-allowed",
              }}
            />
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={productInfo}>
            {calculateAverageRating().toFixed(1)}
            <FaStar style={{ color: "#ffc107" }} />
          </Typography>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: "#fff", padding: "17px 20px 26px" }}>
        <Typography variant="h6" sx={productTitle}>
          {title}
        </Typography>
        <Box sx={productPriceCartStyles}>
          <Box sx={productPriceInfo}>
            {salePrice && (
              <Typography variant="h6" sx={{ color: "red" }}>
                $ {salePrice}
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{ textDecoration: "line-through", color: "#454545" }}
            >
              ${productPrice}
            </Typography>
          </Box>

          <IconButton
            onClick={handleAddToBasket}
            sx={basketButtonStyles}
            disabled={!isClient || !isProductInStock}
          >
            <HiOutlineShoppingBag />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
});

export default ProductCard;
