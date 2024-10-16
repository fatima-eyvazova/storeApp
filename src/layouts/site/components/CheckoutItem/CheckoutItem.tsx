import { Box, Typography } from "@mui/material";
import { BasketProduct } from "../../../../redux/types";

const CheckoutItem = ({ product }: { product: BasketProduct[] }) => {
  const products = Array.isArray(product) ? product : [];

  return (
    <>
      {products.map((item) => {
        const productInfo = item?.product;
        const image = productInfo?.images?.[0] as {
          url: string;
          public_id: string;
        };

        return (
          <Box
            key={item._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "27vw",
              mb: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgb(236, 234, 234)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  width: "70px",
                  border: "1px solid rgb(204, 201, 201)",
                  borderRadius: "3px",
                }}
              >
                <img
                  src={image?.url}
                  alt="basket"
                  style={{ width: "50px", height: "70px" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    padding: "2px 6px",
                    background: "rgb(0 0 0 / 56%)",
                    borderRadius: "50%",
                    color: "#fff",
                  }}
                >
                  <Typography>{item.productCount}</Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  ml: "10px",
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                }}
                variant="h5"
              >
                {productInfo?.title}
              </Typography>
            </Box>

            <Box
              sx={{
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
              }}
            >
              <Typography component="span">
                $ {productInfo?.salePrice}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default CheckoutItem;
