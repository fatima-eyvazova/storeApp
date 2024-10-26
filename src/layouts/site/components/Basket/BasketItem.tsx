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
import { Props } from "../../page/Basket/type";
import { basketImage } from "../../../../constants";

type BasketItemProps = {
  product: Props["product"];
  basketItem: Props["basketItem"];
  handleIncreaseQuantity: (productId: string, currentQuantity: number) => void;
  handleDecreaseQuantity: (productId: string, currentQuantity: number) => void;
  handleRemoveItem: (productId: string) => void;
};

const BasketItem = ({
  product,
  basketItem,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveItem,
}: BasketItemProps) => {
  const { productCount, _id: productId } = basketItem;

  const image = product?.images[0]?.url;

  if (productCount === 0) {
    return null;
  }
  const onIncreaseClick = () => handleIncreaseQuantity(productId, productCount);
  const onDecreaseClick = () => handleDecreaseQuantity(productId, productCount);
  const onRemoveClick = () => handleRemoveItem(productId);

  return (
    <TableRow>
      <TableCell>
        <Box
          component="img"
          src={image}
          alt={product?.title}
          sx={basketImage}
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
          <IconButton onClick={onDecreaseClick}>
            <RemoveCircleOutline />
          </IconButton>
          <Typography>{productCount}</Typography>
          <IconButton onClick={onIncreaseClick}>
            <AddCircleOutline />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>
        <Typography>
          ${(product?.salePrice * productCount).toFixed(2)}
        </Typography>
      </TableCell>
      <TableCell>
        <IconButton onClick={onRemoveClick}>
          <DeleteOutline />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default BasketItem;
