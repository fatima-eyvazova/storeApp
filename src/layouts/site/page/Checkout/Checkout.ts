import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Box, Typography } from "@mui/material";
import { ROUTES } from "../../../../router/routeNames";
import { useAllRemoveBasketMutation, useCreateOrderMutation, useGetBasketItemsQuery, } from "../../../../redux/slices/shared/apiSlice";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import { useTranslation } from "react-i18next";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import { checkoutButton, checkoutContainer, checkoutContent, checkoutItem, checkoutItemContainer, continueShopping, emptyBasketContainer, } from "../../../../constants";
import { useEffect, useState } from "react";
const Checkout = () => {
    const { t } = useTranslation();
    const token = useSelector((state) => state.auth.token);
    const [allRemoveBasket] = useAllRemoveBasketMutation();
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const { data: basketProducts, isLoading: isLoadingProducts } = useGetBasketItemsQuery(token, {
        refetchOnMountOrArgChange: true,
    });
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (basketProducts?.products) {
            setProducts(basketProducts.products);
        }
    }, [basketProducts]);
    const handleCreateOrder = async () => {
        if (!products || products.length === 0) {
            console.error("No products in the basket.");
            return;
        }
        const payload = {
            products: products.map((pr) => ({
                productId: pr._id,
                productCount: pr.productCount,
            })),
        };
        try {
            await createOrder(payload).unwrap();
            await allRemoveBasket().unwrap();
            setProducts([]);
        }
        catch (error) {
            if (error && error.data && error.data.message) {
                alert(error.data.message);
            }
        }
    };
    return (_jsx(MainLayout, { children: _jsx(Box, { sx: checkoutContainer, children: _jsx(Box, { sx: checkoutContent, children: isLoadingProducts ? (_jsx(Typography, { children: t("loadingCheckout") })) : products.length > 0 ? (_jsxs(Box, { sx: checkoutItemContainer, children: [_jsx(Box, { sx: checkoutItem, children: _jsx(CheckoutItem, { product: products }) }), _jsx(Box, { sx: { mt: { xs: 3, md: 0 }, textAlign: "center" }, children: _jsx(Button, { onClick: handleCreateOrder, disabled: isLoading, variant: "contained", sx: checkoutButton, children: isLoading ? t("processing") : t("completeOrder") }) })] })) : (_jsxs(Box, { sx: emptyBasketContainer, children: [_jsx(Typography, { variant: "h5", sx: { fontWeight: 600, mb: 4 }, children: t("orderReceived") }), _jsx(Button, { component: Link, to: ROUTES.home, sx: continueShopping, children: t("continueShopping") })] })) }) }) }));
};
export default Checkout;
