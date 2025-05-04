import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { ROUTES } from "../../../../router/routeNames";
import { useAddNewBasketItemMutation, useGetBasketItemsQuery, } from "../../../../redux/slices/shared/apiSlice";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { shoppingInfo } from "../../../../constants";
import BasketTable from "../../components/Basket/BasketTable/BasketTable";
function Basket() {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.auth);
    const [basketDb, setBasketDb] = useState([]);
    const [total, setTotal] = useState(0);
    const [addToBasket] = useAddNewBasketItemMutation();
    const { data: dbBasketList, isLoading } = useGetBasketItemsQuery({}, {
        refetchOnMountOrArgChange: true,
    });
    const updateTotal = useCallback((basketItems) => {
        const totalAmount = basketItems.reduce((acc, product) => {
            return acc + product?.salePrice * product?.productCount;
        }, 0);
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
    const handleIncreaseQuantity = useCallback(async (productId, currentQuantity) => {
        const newQuantity = currentQuantity + 1;
        const updatedBasket = basketDb.map((item) => item._id === productId ? { ...item, productCount: newQuantity } : item);
        setBasketDb(updatedBasket);
        updateTotal(updatedBasket);
        await addToBasket({
            userId: user?._id,
            productId: productId,
            productCount: newQuantity,
        });
    }, [basketDb, updateTotal, addToBasket, user]);
    const handleDecreaseQuantity = useCallback(async (productId, currentQuantity) => {
        const newQuantity = currentQuantity - 1;
        let updatedBasket = basketDb.map((item) => item._id === productId ? { ...item, productCount: newQuantity } : item);
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
    }, [basketDb, updateTotal, addToBasket, user]);
    const handleRemoveItem = useCallback(async (productId) => {
        const updatedBasket = basketDb.filter((item) => item._id !== productId);
        setBasketDb(updatedBasket);
        updateTotal(updatedBasket);
        await addToBasket({
            userId: user?._id,
            productId: productId,
            productCount: 0,
        });
    }, [basketDb, updateTotal, addToBasket, user]);
    useEffect(() => {
        if (dbBasketList) {
            setBasketDb(dbBasketList?.products);
            updateTotal(dbBasketList?.products);
        }
    }, [dbBasketList, isLoading, updateTotal]);
    return (_jsx(MainLayout, { children: _jsxs(Box, { sx: { padding: 3 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "Your Shopping Cart" }), _jsx(Box, { children: basketDb?.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(BasketTable, { basketItems: basketDb, handleIncreaseQuantity: handleIncreaseQuantity, handleDecreaseQuantity: handleDecreaseQuantity, handleRemoveItem: handleRemoveItem }), _jsxs(Box, { sx: shoppingInfo, children: [_jsx(Button, { component: Link, to: "/", variant: "contained", children: t("continueShopping") }), _jsx(Button, { variant: "contained", color: "error", onClick: clearBasketItems, children: t("clearCart") })] }), _jsxs(Box, { sx: { textAlign: "right", mt: 3 }, children: [_jsxs(Typography, { variant: "h5", children: [t("grandTotal"), " ", total?.toFixed(2) || 0] }), _jsx(Button, { variant: "contained", color: "primary", component: Link, to: ROUTES.checkout, sx: { mt: 2 }, children: t("ProceedCheckout") })] })] })) : (_jsx(Typography, { variant: "h6", gutterBottom: true, sx: { height: "30vh" }, children: t("emptyCart") })) })] }) }));
}
export default Basket;
