import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { useAddNewBasketItemMutation, useAddRemoveFavoriteMutation, } from "../../../../redux/slices/shared/apiSlice";
import { basketButtonStyles, heartIconContainerStyles, productCardStyles, productImageStyles, productInfo, productPriceCartStyles, productPriceInfo, productTitle, } from "../../../../constants";
const ProductCard = React.memo(({ product, favs }) => {
    const { _id: id, title, productPrice, salePrice, images, stock } = product;
    const { token, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [localQuantity, setLocalQuantity] = useState(1);
    const [addToBasket] = useAddNewBasketItemMutation();
    const rating = product?.rating;
    const [addRemoveFavorite, { isLoading }] = useAddRemoveFavoriteMutation();
    const favorite = favs?.find((pr) => pr?._id === product?._id);
    const [isFavorite, setIsFavorite] = useState(!!favorite);
    const handleAddToBasket = useCallback(async (e) => {
        e.stopPropagation();
        if (token && user?.role === "client") {
            try {
                await addToBasket({
                    userId: user?._id,
                    productId: id,
                    productCount: localQuantity,
                });
                setLocalQuantity((prev) => prev + 1);
            }
            catch (error) {
                console.error("Basket update error:", error);
            }
        }
    }, [addToBasket, id, localQuantity, token, user]);
    const handleClick = () => {
        navigate(`/products/${id}`);
    };
    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (!isClient)
            return;
        setIsFavorite((prev) => !prev);
        addRemoveFavorite({
            product_id: id,
        });
    };
    const calculateAverageRating = () => {
        const { avgRating, overallRatingCount } = rating;
        return overallRatingCount > 0 ? avgRating : 0;
    };
    const isClient = token && user?.role === "client";
    const isProductInStock = stock > 0;
    return (_jsxs(Box, { onClick: handleClick, sx: productCardStyles, disabled: isLoading, children: [_jsx(Box, { sx: { overflow: "hidden", backgroundColor: "#fff" }, children: images && images.length > 0 && (_jsx(Box, { component: "img", src: images[0].url, alt: "product-image", sx: productImageStyles })) }), _jsxs(Box, { sx: heartIconContainerStyles, children: [_jsx(Box, { onClick: handleFavoriteClick, disabled: !isClient, children: isFavorite ? (_jsx(FaHeart, { style: {
                                color: isClient ? "red" : "grey",
                                fontSize: 20,
                                cursor: isClient ? "pointer" : "not-allowed",
                            } })) : (_jsx(FaRegHeart, { style: {
                                color: isClient ? "black" : "grey",
                                fontSize: 20,
                                cursor: isClient ? "pointer" : "not-allowed",
                            } })) }), _jsx(Box, { sx: { display: "flex", alignItems: "center" }, children: _jsxs(Typography, { variant: "body2", sx: productInfo, children: [calculateAverageRating().toFixed(1), _jsx(FaStar, { style: { color: "#ffc107" } })] }) })] }), _jsxs(Box, { sx: { backgroundColor: "#fff", padding: "17px 20px 26px" }, children: [_jsx(Typography, { variant: "h6", sx: productTitle, children: title }), _jsxs(Box, { sx: productPriceCartStyles, children: [_jsxs(Box, { sx: productPriceInfo, children: [salePrice && (_jsxs(Typography, { variant: "h6", sx: { color: "red" }, children: ["$ ", salePrice] })), _jsxs(Typography, { variant: "body2", sx: { textDecoration: "line-through", color: "#454545" }, children: ["$", productPrice] })] }), _jsx(IconButton, { onClick: handleAddToBasket, sx: basketButtonStyles, disabled: !isClient || !isProductInStock, children: _jsx(HiOutlineShoppingBag, {}) })] })] })] }));
});
export default ProductCard;
