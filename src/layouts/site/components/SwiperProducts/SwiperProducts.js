import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Box, IconButton } from "@mui/material";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import { navButtonStyles, overlayStyles, swiperContainerStyles, } from "../../../../constants";
import ProductCard from "../Products/ProductCard";
const SwiperProducts = ({ products, favs }) => {
    const productsList = products?.data?.product || [];
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    useEffect(() => {
        const prevButton = prevRef.current;
        const nextButton = nextRef.current;
        if (prevButton && nextButton) {
            prevButton.classList.add("custom-prev-button");
            nextButton.classList.add("custom-next-button");
        }
    }, []);
    const handleSwiperInit = (swiper) => {
        const navigation = swiper.params.navigation;
        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
    };
    return (_jsxs(Box, { sx: swiperContainerStyles, children: [_jsxs(Box, { sx: overlayStyles, children: [_jsx(IconButton, { ref: prevRef, sx: navButtonStyles, children: _jsx(FaArrowLeftLong, { size: 24 }) }), _jsx(IconButton, { ref: nextRef, sx: navButtonStyles, children: _jsx(FaArrowRightLong, { size: 24 }) })] }), _jsx(Swiper, { slidesPerView: 4, spaceBetween: 10, loop: true, pagination: { clickable: true }, navigation: { prevEl: prevRef.current, nextEl: nextRef.current }, onInit: handleSwiperInit, modules: [Pagination, Navigation], children: productsList.slice(0, 20).map((product) => (_jsx(SwiperSlide, { children: _jsx(Box, { sx: { display: "flex", justifyContent: "center" }, children: _jsx(ProductCard, { product: product, favs: favs }) }) }, product._id))) })] }));
};
export default SwiperProducts;
