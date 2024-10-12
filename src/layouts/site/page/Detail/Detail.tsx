import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../../redux/slices/shared/apiSlice";
import {
  // Card,
  // CardContent,
  // CardMedia,
  Typography,
  Box,
  // Button,
} from "@mui/material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Breadcrumbs, Link } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";
import ProductInfo from "../../../site/components/ProductInfo/ProductInfo";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/types";
const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, error, isLoading } = useGetProductByIdQuery(id || "", {
    skip: !token,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching product.</div>;

  const product = data?.data;

  return (
    <MainLayout>
      <Box className="product-details" py={4}>
        {product && (
          <Box className="container">
            <Box className="product-content" mb={3}>
              <Typography variant="h4" component="h2" gutterBottom>
                {product?.title}
              </Typography>

              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<IoIosArrowForward fontSize="small" />}
                sx={{ mb: 2 }}
              >
                <Link
                  component={RouterLink}
                  to="/"
                  underline="hover"
                  color="inherit"
                >
                  Home
                </Link>
                <Typography color="text.primary">{product?.title}</Typography>
              </Breadcrumbs>
            </Box>

            <ProductInfo product={product} />
          </Box>
        )}
      </Box>
    </MainLayout>
  );
};

export default ProductDetails;
