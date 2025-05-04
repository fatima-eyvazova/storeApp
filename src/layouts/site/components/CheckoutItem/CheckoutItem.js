import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
import { badgeContainer, checkoutItemText, imageContainer, priceText, productTitle2, shopListStyle, } from "../../../../constants";
const CheckoutItem = ({ product }) => {
    const products = Array.isArray(product) ? product : [];
    return (_jsx(_Fragment, { children: products.map((item) => {
            const image = item?.images?.[0];
            return (_jsxs(Box, { sx: checkoutItemText, children: [_jsxs(Box, { sx: shopListStyle, children: [_jsxs(Box, { sx: imageContainer, children: [_jsx("img", { src: image?.url, alt: "basket", style: { width: "50px", height: "70px" } }), _jsx(Box, { sx: badgeContainer, children: _jsx(Typography, { children: item.productCount }) })] }), _jsx(Typography, { sx: productTitle2, variant: "h5", children: item?.title })] }), _jsx(Box, { sx: priceText, children: _jsxs(Typography, { component: "span", children: ["$ ", item?.salePrice] }) })] }, item._id));
        }) }));
};
export default CheckoutItem;
