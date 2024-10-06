import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../../redux/slices/shared/apiSlice";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMWViYzM5MC03Y2EwLTExZWYtODYwMS01YmFjMGM4NWMzYmEiLCJpYXQiOjE3MjgyMjE4NTcsImV4cCI6MTcyODMwODI1N30.SwVg2Bsw2oX5J4EKSb8vUUa9elrPFrv4JZArMrL5DZY";

  const { data, error, isLoading } = useGetProductByIdQuery(id || "", {
    skip: !token,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching product.</div>;

  const product = data?.data;

  return (
    <div className="product-details">
      {product && (
        <Card
          sx={{
            maxWidth: "1000px",
            margin: "32px auto",
            padding: "16px",
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
          }}
        >
          <CardMedia
            component="img"
            height="400"
            image={
              product.images && product.images.length > 0
                ? product.images[0].url
                : ""
            }
            alt={product.title}
            sx={{
              objectFit: "contain",
              maxWidth: "400px",
              borderRadius: "8px",
            }}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h3"
              component="div"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {product.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ marginBottom: 2 }}
            >
              <Typography
                variant="h4"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                ${product.productPrice}
              </Typography>
              {product.salePrice < product.productPrice && (
                <Typography
                  variant="h5"
                  color="red"
                  sx={{ textDecoration: "line-through" }}
                >
                  ${product.salePrice}
                </Typography>
              )}
            </Box>
            <Typography variant="body1" color="text.secondary">
              {product.stock > 0
                ? `Mövcuddur: ${product.stock} ədəd`
                : "Stokda yoxdur"}
            </Typography>
            <Box display="flex" gap={2} sx={{ marginTop: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
              >
                Səbətə əlavə et
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<FavoriteBorderIcon />}
              >
                Favoritlərə əlavə et
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductDetails;
