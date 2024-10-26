import { Box, Typography } from "@mui/material";
import { BasketProduct } from "../../../../redux/types";
import {
  badgeContainer,
  checkoutItemText,
  imageContainer,
  priceText,
  productTitle2,
  shopListStyle,
} from "../../../../constants";

const CheckoutItem = ({ product }: { product: BasketProduct[] }) => {
  const products = Array.isArray(product) ? product : [];

  return (
    <>
      {products.map((item) => {
        const image = item?.images?.[0] as {
          url: string;
          public_id: string;
        };

        return (
          <Box key={item._id} sx={checkoutItemText}>
            <Box sx={shopListStyle}>
              <Box sx={imageContainer}>
                <img
                  src={image?.url}
                  alt="basket"
                  style={{ width: "50px", height: "70px" }}
                />
                <Box sx={badgeContainer}>
                  <Typography>{item.productCount}</Typography>
                </Box>
              </Box>
              <Typography sx={productTitle2} variant="h5">
                {item?.title}
              </Typography>
            </Box>

            <Box sx={priceText}>
              <Typography component="span">$ {item?.salePrice}</Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default CheckoutItem;
