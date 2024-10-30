import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ROUTES } from "../../../../router/routeNames";
import {
  useAddNewBasketItemMutation,
  useGetBasketItemsQuery,
} from "../../../../redux/slices/shared/apiSlice";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import BasketItem from "../../components/Basket/BasketItem";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BasketItemType, User } from "./type";
import { shoppingInfo } from "../../../../constants";

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

  console.log("dbBasketList", dbBasketList);

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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t("image")}</TableCell>
                    <TableCell>{t("productName")}</TableCell>
                    <TableCell>{t("priceBasket")}</TableCell>
                    <TableCell>{t("quantity")}</TableCell>
                    <TableCell>{t("subtotal")}</TableCell>
                    <TableCell>{t("remove")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {basketDb.map((basketItem: BasketItemType) => {
                    const { productCount } = basketItem;

                    if (!basketItem) {
                      return (
                        <TableRow key={basketItem._id}>
                          <TableCell colSpan={6}>{t("Loading")}</TableCell>
                        </TableRow>
                      );
                    }

                    if (
                      !basketItem?.images ||
                      basketItem?.images?.length === 0
                    ) {
                      return (
                        <TableRow key={basketItem?._id}>
                          <TableCell colSpan={6}>
                            {t("NoImageAvailable")}
                          </TableCell>
                        </TableRow>
                      );
                    }

                    return (
                      <BasketItem
                        key={basketItem._id}
                        product={basketItem}
                        basketItem={{ productCount, _id: basketItem._id }}
                        handleIncreaseQuantity={handleIncreaseQuantity}
                        handleDecreaseQuantity={handleDecreaseQuantity}
                        handleRemoveItem={handleRemoveItem}
                      />
                    );
                  })}
                </TableBody>
              </Table>
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
