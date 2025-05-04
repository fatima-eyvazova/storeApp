import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { bannerSlideStyles, bannerStyles } from "../../../../../constants";
const BannerSwiper = () => {
    const { t } = useTranslation();
    return (_jsx(Box, { children: _jsxs(Swiper, { effect: "fade", pagination: { clickable: true }, autoplay: { delay: 3000, disableOnInteraction: false }, modules: [EffectFade, Pagination, Autoplay], style: { width: "100vw", height: "100vh" }, children: [_jsx(SwiperSlide, { children: _jsx(Box, { sx: bannerSlideStyles, children: _jsxs(Box, { children: [_jsx(Typography, { variant: "h3", sx: { fontWeight: "bold" }, children: t("autumnCollection") }), _jsx(Typography, { variant: "h6", sx: { my: 2 }, children: t("autumnDescription") })] }) }) }), _jsx(SwiperSlide, { children: _jsx(Box, { sx: bannerStyles, children: _jsxs(Box, { children: [_jsx(Typography, { variant: "h3", sx: { fontWeight: "bold" }, children: t("summerSale") }), _jsx(Typography, { variant: "h6", sx: { my: 2 }, children: t("summerDescription") })] }) }) })] }) }));
};
export default BannerSwiper;
