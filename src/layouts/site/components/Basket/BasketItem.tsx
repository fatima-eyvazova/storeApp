import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  DeleteOutline,
} from "@mui/icons-material";

import { useState } from "react";
import { BasketProduct, RootState } from "../../../../redux/types";
import {
  useRemoveBasketItemMutation,
  useUpdateBasketItemMutation,
} from "../../../../redux/slices/shared/apiSlice";
import {
  addToBasket,
  decreaseItem,
  removeItem,
} from "../../../../redux/slices/site/basketSlice";

type Props = {
  product: BasketProduct;
};

const BasketItem = ({ product }: Props) => {
  const [updating, setUpdating] = useState(false);
  const { token, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [updateBasketItem] = useUpdateBasketItemMutation();
  const [removeBasketItem] = useRemoveBasketItemMutation();

  const handleIncreaseQuantity = async () => {
    if (token && user?.role === "client") {
      setUpdating(true);
      await updateBasketItem({
        id: product._id,
        productCount: product.quantity + 1,
        token,
      });
      dispatch(addToBasket({ ...product, quantity: 1 }));
      setUpdating(false);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (token && user?.role === "client") {
      setUpdating(true);
      if (product.quantity > 1) {
        await updateBasketItem({
          id: product._id,
          productCount: product.quantity - 1,
          token,
        });
        dispatch(decreaseItem({ _id: product._id, price: product.salePrice }));
      } else {
        await removeBasketItem({ id: product._id, token });
        dispatch(removeItem({ _id: product._id, subtotal: product.subtotal }));
      }
      setUpdating(false);
    }
  };

  const handleRemoveItem = async () => {
    if (token && user?.role === "client") {
      await removeBasketItem({ id: product._id, token });
      dispatch(removeItem({ _id: product._id, subtotal: product.subtotal }));
    }
  };

  const image = product?.images?.[0]?.url;

  return (
    <TableRow>
      <TableCell>
        <Box
          component="img"
          src={image}
          alt={product.title}
          sx={{ width: 100, height: 100, objectFit: "contain" }}
        />
      </TableCell>
      <TableCell>
        <Typography>{product?.title?.slice(0, 18)}...</Typography>
      </TableCell>
      <TableCell>
        <Typography>${product?.salePrice}</Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleDecreaseQuantity} disabled={updating}>
            <RemoveCircleOutline />
          </IconButton>
          <Typography>{product.quantity}</Typography>
          <IconButton onClick={handleIncreaseQuantity} disabled={updating}>
            <AddCircleOutline />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>
        <Typography>${product.subtotal}</Typography>
      </TableCell>
      <TableCell>
        <IconButton onClick={handleRemoveItem} disabled={updating}>
          <DeleteOutline />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default BasketItem;
