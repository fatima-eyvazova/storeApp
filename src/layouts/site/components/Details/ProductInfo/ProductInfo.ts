import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useRef } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoAlertOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import { TiSocialGooglePlus } from "react-icons/ti";
import { TbBrandPinterest } from "react-icons/tb";
import { Box, Typography, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { iconButtonStyle, productInfoBox, swiperStlyle, titleInfoStile, } from "../../../../../constants";
const ProductInfo = React.memo(({ product, isFavorite, handleFavoriteClick, handleAddToBasket }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { token, user } = useSelector((state) => state.auth);
    const swiper1Ref = useRef(null);
    const productImages = product?.images;
    const isClient = token && user?.role === "client";
    const isProductInStock = product.stock > 0;
    const handleSwiper = (swiper) => {
        if (swiper1Ref.current) {
            swiper1Ref.current = swiper;
        }
    };
    const isThumbsSwiperValid = thumbsSwiper && !thumbsSwiper.destroyed;
    return (_jsxs(Box, { sx: productInfoBox, children: [_jsxs(Box, { sx: { width: "50vw" }, children: [_jsx(Swiper, { style: swiperStlyle, onSwiper: handleSwiper, spaceBetween: 10, navigation: true, thumbs: {
                            swiper: isThumbsSwiperValid ? thumbsSwiper : null,
                        }, modules: [FreeMode, Navigation, Thumbs], children: productImages?.map((image) => (_jsx(SwiperSlide, { children: _jsx(Box, { component: "figure", sx: { width: "90vh" }, children: _jsx("img", { src: image?.url, alt: "swiper", style: {
                                        width: "37vw",
                                        height: "87vh ",
                                    } }) }) }, image.public_id))) }), _jsx(Swiper, { onSwiper: setThumbsSwiper, spaceBetween: 10, slidesPerView: 4, freeMode: true, watchSlidesProgress: true, modules: [FreeMode, Navigation, Thumbs], children: productImages?.map((image) => (_jsx(SwiperSlide, { children: _jsx(Box, { component: "figure", sx: { height: "60vh" }, children: _jsx("img", { src: image?.url, alt: "swiper", style: { width: "100%" } }) }) }, image.public_id))) })] }), _jsxs(Box, { sx: { pt: 9, p: 2 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: product?.title }), _jsxs(Box, { sx: titleInfoStile, children: [_jsxs(Typography, { variant: "body2", sx: { textDecoration: "line-through" }, children: ["$", product?.productPrice] }), _jsxs(Typography, { variant: "h6", children: ["$", product?.salePrice] })] }), _jsxs(Box, { sx: titleInfoStile, children: [product?.stock > 0 ? (_jsx(IoMdCheckboxOutline, { color: "green" })) : (_jsx(IoAlertOutline, { color: "red" })), _jsx(Typography, { children: product?.stock > 0 ? "In Stock" : "Out of Stock" })] }), _jsx(Typography, { variant: "body1", mb: 2, children: product?.description }), _jsxs(Box, { sx: titleInfoStile, children: [_jsx(IconButton, { onClick: handleAddToBasket, sx: iconButtonStyle, disabled: !isClient || !isProductInStock, children: _jsx(HiOutlineShoppingBag, {}) }), _jsx(IconButton, { onClick: handleFavoriteClick, children: isFavorite ? (_jsx(IoHeart, { color: "red" })) : (_jsx(IoHeartOutline, { color: "black" })) })] }), _jsxs(Box, { sx: { gap: 2, display: "flex" }, children: [_jsx(IconButton, { children: _jsx(FaFacebookF, {}) }), _jsx(IconButton, { children: _jsx(FaTwitter, {}) }), _jsx(IconButton, { children: _jsx(TiSocialGooglePlus, {}) }), _jsx(IconButton, { children: _jsx(TbBrandPinterest, {}) })] })] })] }));
});
export default ProductInfo;
