import { useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetOrdersQuery,
  useGiveFeedbackMutation,
  useAddRemoveFavoriteMutation,
  useGetProfileQuery,
  useAddNewBasketItemMutation,
  // useUpdateBasketItemMutation,
  useGetBasketItemsQuery,
  useGetProductReviewsQuery,
} from "../../../../redux/slices/shared/apiSlice";
import { Typography, Box, Breadcrumbs, Link, Button } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";
import ProductInfo from "../../components/Details/ProductInfo/ProductInfo";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ProductReviewList from "../../components/Details/ProductReviewList";

const ProductDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const userId = useSelector((state: RootState) => state.auth.user);
  const { token, user } = useSelector((state: RootState) => state.auth);

  const [giveFeedback] = useGiveFeedbackMutation();
  const { data: userProfile } = useGetProfileQuery();
  const { data: reviews } = useGetProductReviewsQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [addRemoveFavorite] = useAddRemoveFavoriteMutation();
  const [addToBasket] = useAddNewBasketItemMutation();
  const { data: dbBasketList } = useGetBasketItemsQuery(token, {
    skip: !token || user?.role !== "client",
  });
  const { data } = useGetProductByIdQuery(id || "");

  const { data: ordersData } = useGetOrdersQuery({
    perPage: 10,
    page: 1,
    status: "delivered",
  });

  const product = data?.data;

  const favs = userProfile?.data?.user.favorites || [];
  const favorite = favs.find((pr) => pr?._id === product?._id);
  const [isFavorite, setIsFavorite] = useState(favorite);

  const isPurchased = ordersData?.data?.data?.some((order: any) =>
    order.products.some(
      (orderProduct: any) =>
        orderProduct.productId === id && order.customer.userId === userId?._id
    )
  );

  const handleReviewSubmit = async (rating: number, review: string) => {
    try {
      const feedbackData = {
        product_id: product._id,
        review,
        rating,
      };
      await giveFeedback(feedbackData).unwrap();
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review");
    }
  };
  const handleAddToBasket = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (token && user?.role === "client") {
      try {
        if (dbBasketList?.data) {
          const basketItem = dbBasketList?.data.find(
            (item) => item?.productId === id
          );
        }
        console.log({ basketItem });

        if (basketItem) {
          const quantity = basketItem.productCount + 1;
          // await updateBasketItem({
          //   id: basketItem._id,
          //   productCount: quantity,
          //   productId: basketItem.productId,
          // });
        } else {
          await addToBasket({
            basket: [
              {
                productId: id,
                productCount: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Basket update error:", error);
      }
    }
  };

  const handleFavoriteClick = (e: React.ChangeEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
    addRemoveFavorite({
      product_id: id,
    });
  };

  return (
    <MainLayout>
      <Box py={4}>
        {product && (
          <Box>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
                  {t("productDetailsTitle")}
                </Link>
                <Typography color="text.primary">{product?.title}</Typography>
              </Breadcrumbs>
            </Box>
            <Box
              sx={{
                width: "80vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
