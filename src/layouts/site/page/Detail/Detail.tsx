import { useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetOrdersQuery,
  useGiveFeedbackMutation,
  useAddRemoveFavoriteMutation,
  useGetProfileQuery,
  useAddNewBasketItemMutation,
  useGetProductReviewsQuery,
} from "../../../../redux/slices/shared/apiSlice";
import { Typography, Box, Breadcrumbs, Link } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";
import ProductInfo from "../../components/Details/ProductInfo/ProductInfo";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/types";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import ProductReviewList from "../../components/Details/ProductReviewList";
import { detailBox, infoBox } from "../../../../constants";
import { ROUTES } from "../../../../router/routeNames";
import { ProductReviewListProps } from "./type";

const ProductDetails: React.FC<ProductReviewListProps> = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const userId = useSelector((state: RootState) => state.auth.user);
  const { token, user } = useSelector((state: RootState) => state.auth);

  const [giveFeedback] = useGiveFeedbackMutation();
  const { data: userProfile } = useGetProfileQuery(userId);
  const { data: reviews, refetch: refetchReviews } = useGetProductReviewsQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [addRemoveFavorite] = useAddRemoveFavoriteMutation();
  const [addToBasket] = useAddNewBasketItemMutation();
  const [localQuantity, setLocalQuantity] = useState(1);

  const { data } = useGetProductByIdQuery(id || "");

  const { data: ordersData } = useGetOrdersQuery({
    perPage: 10,
    page: 1,
    status: "delivered",
  });

  const product = data?.data;

  const favs = userProfile?.data?.user.favorites || [];
  const favorite = favs.find((pr: { _id: string }) => pr?._id === product?._id);
  const [isFavorite, setIsFavorite] = useState(favorite);

  const isPurchased = () => {
    return ordersData?.data?.data?.some(
      (order: { products: []; customer: { userId: string } }) =>
        order.products.some(
          (orderProduct) =>
            orderProduct?.productId == id &&
            order?.customer?.userId == userId?._id
        )
    );
  };

  const handleReviewSubmit = async (rating: number, review: string) => {
    try {
      const feedbackData = {
        product_id: product._id,
        review,
        rating,
      };
      await giveFeedback(feedbackData).unwrap();
      refetchReviews();
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review");
    }
  };

  const handleAddToBasket = useCallback(
    async (e: React.MouseEvent) => {
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
    [token, user?.role, localQuantity, addToBasket, id]
  );

  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFavorite((prev: unknown) => !prev);
      addRemoveFavorite({
        product_id: id,
      });
    },
    [id, addRemoveFavorite]
  );

  return (
    <MainLayout>
      <Box py={4}>
        {product && (
          <Box>
            <Box sx={detailBox}>
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
                  to={ROUTES.home}
                  underline="hover"
                  color="inherit"
                >
                  {t("productDetailsTitle")}
                </Link>
                <Typography color="text.primary">{product?.title}</Typography>
              </Breadcrumbs>
            </Box>
            <Box sx={infoBox}>
              <ProductInfo
                handleFavoriteClick={handleFavoriteClick}
                handleAddToBasket={handleAddToBasket}
                isFavorite={isFavorite}
                product={product}
              />
            </Box>
            {reviews?.data && (
              <ProductReviewList
                reviews={reviews?.data}
                handleReviewSubmit={handleReviewSubmit}
                isPurchased={isPurchased}
              />
            )}
          </Box>
        )}
      </Box>
    </MainLayout>
  );
};

export default ProductDetails;
