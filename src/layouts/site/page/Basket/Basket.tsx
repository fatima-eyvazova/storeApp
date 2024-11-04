import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { ROUTES } from "../../../../router/routeNames";
import {
  useAddNewBasketItemMutation,
  useGetBasketItemsQuery,
} from "../../../../redux/slices/shared/apiSlice";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BasketItemType, User } from "./type";
import { shoppingInfo } from "../../../../constants";
import BasketTable from "../../components/Basket/BasketTable/BasketTable";

function Basket() {
  const { t } = useTranslation();
  const { user } = useSelector((state: { auth: { user: User } }) => state.auth);
  const [basketDb, setBasketDb] = useState<BasketItemType[]>([]);
  const [total, setTotal] = useState(0);
  const [addToBasket] = useAddNewBasketItemMutation();
  const { data: dbBasketList, isLoading } = useGetBasketItemsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const updateTotal = useCallback((basketItems: BasketItemType[]) => {
    const totalAmount = basketItems.reduce(
      (acc: number, product: BasketItemType) => {
        return acc + product?.salePrice * product?.productCount;
      },
      0
    );
    setTotal(totalAmount);
  }, []);

  const clearBasketItems = useCallback(async () => {
    if (basketDb.length) {
      for (const product of basketDb) {
        await addToBasket({
          userId: user?._id,
          productId: product?._id,
          productCount: 0,
        });
      }
    }
    setBasketDb([]);
    setTotal(0);
  }, [basketDb, addToBasket, user]);

  const handleIncreaseQuantity = useCallback(
    async (productId: string, currentQuantity: number) => {
      const newQuantity = currentQuantity + 1;
      const updatedBasket = basketDb.map((item) =>
        item._id === productId ? { ...item, productCount: newQuantity } : item
      );
      setBasketDb(updatedBasket);
      updateTotal(updatedBasket);

      await addToBasket({
        userId: user?._id,
        productId: productId,
        productCount: newQuantity,
      });
    },
    [basketDb, updateTotal, addToBasket, user]
  );

  const handleDecreaseQuantity = useCallback(
    async (productId: string, currentQuantity: number) => {
      const newQuantity = currentQuantity - 1;
      let updatedBasket = basketDb.map((item) =>
        item._id === productId ? { ...item, productCount: newQuantity } : item
      );
      if (newQuantity === 0) {
        updatedBasket = updatedBasket.filter((item) => item._id !== productId);
      }
      setBasketDb(updatedBasket);
      updateTotal(updatedBasket);
      await addToBasket({
        userId: user?._id,
        productId: productId,
        productCount: newQuantity,
      });
    },
    [basketDb, updateTotal, addToBasket, user]
  );

  const handleRemoveItem = useCallback(
    async (productId: string) => {
      const updatedBasket = basketDb.filter((item) => item._id !== productId);
      setBasketDb(updatedBasket);
      updateTotal(updatedBasket);
      await addToBasket({
        userId: user?._id,
        productId: productId,
        productCount: 0,
      });
    },
    [basketDb, updateTotal, addToBasket, user]
  );

  useEffect(() => {
    if (dbBasketList) {
      setBasketDb(dbBasketList?.products);
      updateTotal(dbBasketList?.products);
    }
  }, [dbBasketList, isLoading, updateTotal]);

  return (
    <MainLayout>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Your Shopping Cart
        </Typography>
        <Box>
          {basketDb?.length > 0 ? (
            <>
              <BasketTable
                basketItems={basketDb}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleRemoveItem={handleRemoveItem}
              />
              <Box sx={shoppingInfo}>
                <Button component={Link} to="/" variant="contained">
                  {t("continueShopping")}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={clearBasketItems}
                >
                  {t("clearCart")}
                </Button>
              </Box>
              <Box sx={{ textAlign: "right", mt: 3 }}>
                <Typography variant="h5">
                  {t("grandTotal")} {total?.toFixed(2) || 0}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={ROUTES.checkout}
                  sx={{ mt: 2 }}
                >
                  {t("ProceedCheckout")}
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="h6" gutterBottom sx={{ height: "30vh" }}>
              {t("emptyCart")}
            </Typography>
          )}
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Basket;
