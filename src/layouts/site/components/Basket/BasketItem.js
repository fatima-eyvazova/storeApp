import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { IconButton, TableCell, TableRow, Typography, Box, } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline, DeleteOutline, } from "@mui/icons-material";
import { basketImage } from "../../../../constants";
const BasketItem = React.memo(({ product, basketItem, handleIncreaseQuantity, handleDecreaseQuantity, handleRemoveItem, }) => {
    const { productCount, _id: productId } = basketItem;
    const image = product?.images[0]?.url;
    if (productCount === 0) {
        return null;
    }
    const onIncreaseClick = () => handleIncreaseQuantity(productId, productCount);
    const onDecreaseClick = () => handleDecreaseQuantity(productId, productCount);
    const onRemoveClick = () => handleRemoveItem(productId);
    return (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Box, { component: "img", src: image, alt: product?.title, sx: basketImage }) }), _jsx(TableCell, { children: _jsx(Typography, { children: product?.title }) }), _jsx(TableCell, { children: _jsxs(Typography, { children: ["$", product?.salePrice?.toFixed(2)] }) }), _jsx(TableCell, { children: _jsxs(Box, { sx: { display: "flex", alignItems: "center" }, children: [_jsx(IconButton, { onClick: onDecreaseClick, children: _jsx(RemoveCircleOutline, {}) }), _jsx(Typography, { children: productCount }), _jsx(IconButton, { onClick: onIncreaseClick, children: _jsx(AddCircleOutline, {}) })] }) }), _jsx(TableCell, { children: _jsxs(Typography, { children: ["$", (product?.salePrice * productCount).toFixed(2)] }) }), _jsx(TableCell, { children: _jsx(IconButton, { onClick: onRemoveClick, children: _jsx(DeleteOutline, {}) }) })] }));
});
export default BasketItem;
