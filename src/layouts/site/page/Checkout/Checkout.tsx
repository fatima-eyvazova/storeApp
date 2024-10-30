import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Box, Typography } from "@mui/material";
import { ROUTES } from "../../../../router/routeNames";
import { BasketProduct, RootState } from "../../../../redux/types";
import {
  useCreateOrderMutation,
  useGetBasketItemsQuery,
  useRemoveBasketItemMutation,
} from "../../../../redux/slices/shared/apiSlice";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import { useTranslation } from "react-i18next";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import {
  checkoutButton,
  checkoutContainer,
  checkoutContent,
  checkoutItem,
  checkoutItemContainer,
  continueShopping,
  emptyBasketContainer,
} from "../../../../constants";

const Checkout = () => {
  const { t } = useTranslation();
  const token = useSelector((state: RootState) => state.auth.token);

  const { data: basketProducts, isLoading: isLoadingProducts } =
    useGetBasketItemsQuery(token, {
      refetchOnMountOrArgChange: true,
    });

  const product = basketProducts?.products as BasketProduct[];

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [removeBasketItem] = useRemoveBasketItemMutation();

  const handleCreateOrder = async () => {
    if (!product || product?.length === 0) {
      console.error("No products in the basket.");
      return;
    }

    const payload = {
      products: product.map((pr) => ({
        productId: pr?._id,
        productCount: pr?.productCount,
      })),
    };

    try {
      await createOrder(payload).unwrap();
      for (const item of product) {
        await removeBasketItem({
          id: item._id,
          token,
        }).unwrap();
      }
    } catch (error) {
      if (error && error.data && error.data.message) {
        alert(error.data.message);
      }
    }
  };

  return (
    <MainLayout>
      <Box sx={checkoutContainer}>
        <Box sx={checkoutContent}>
          {isLoadingProducts ? (
            <Typography>{t("loadingCheckout")}</Typography>
          ) : product?.length > 0 ? (
            <Box sx={checkoutItemContainer}>
              <Box sx={checkoutItem}>
                <CheckoutItem product={product} />
              </Box>
              <Box sx={{ mt: { xs: 3, md: 0 }, textAlign: "center" }}>
                <Button
                  onClick={handleCreateOrder}
                  disabled={isLoading}
                  variant="contained"
                  sx={checkoutButton}
                >
                  {isLoading ? t("processing") : t("completeOrder")}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={emptyBasketContainer}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
                {t("orderReceived")}
              </Typography>
              <Button component={Link} to={ROUTES.home} sx={continueShopping}>
                {t("continueShopping")}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Checkout;
