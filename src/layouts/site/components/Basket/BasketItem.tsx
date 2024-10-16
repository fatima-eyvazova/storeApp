import { useState } from "react";
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

type Props = {
  product: {
    _id: string;
    quantity: number;
    product: {
      title: string;
      salePrice: number;
      subtotal: number;
      images: { url: string }[];
    };
  };
  onUpdate: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

const BasketItem = ({ product, basketItem, onUpdate, onRemove }: Props) => {
  const [localQuantity, setLocalQuantity] = useState(basketItem?.productCount);
  const [updating, setUpdating] = useState(false);
  console.log("product", product);

  const handleIncreaseQuantity = async () => {
    setUpdating(true);
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    await onUpdate(basketItem._id, newQuantity, product._id);
    setUpdating(false);
  };

  const handleDecreaseQuantity = async () => {
    if (localQuantity > 1) {
      setUpdating(true);
      const newQuantity = localQuantity - 1;
      setLocalQuantity(newQuantity);
      await onUpdate(product._id, newQuantity);
      setUpdating(false);
    } else {
      await handleRemoveItem();
    }
  };

  const handleRemoveItem = async () => {
    await onRemove(product._id);
  };

  const image = product?.images[0]?.url;

  return (
    <TableRow>
      <TableCell>
        <Box
          component="img"
          src={image}
          alt={product?.title}
          sx={{ width: 100, height: 100, objectFit: "contain" }}
        />
      </TableCell>
      <TableCell>
        <Typography>{product?.title}</Typography>
      </TableCell>
      <TableCell>
        <Typography>${product?.salePrice?.toFixed(2)}</Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleDecreaseQuantity}>
            <RemoveCircleOutline />
          </IconButton>
          <Typography>{localQuantity}</Typography>
          <IconButton onClick={handleIncreaseQuantity}>
            <AddCircleOutline />
          </IconButton>
        </Box>
      </TableCell>
      {/* <TableCell>
        <Typography>
          ${(product?.salePrice * localQuantity).toFixed(2)}
        </Typography>
      </TableCell> */}
      <TableCell>
        <IconButton onClick={handleRemoveItem}>
          <DeleteOutline />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default BasketItem;
