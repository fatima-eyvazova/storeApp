import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Box, IconButton } from "@mui/material";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useRef } from "react";

import {
  navButtonStyles,
  overlayStyles,
  swiperContainerStyles,
} from "../../../../constants";
import { GetProductItem } from "../../../../redux/types";
import ProductCard from "../Products/ProductCard";

interface SwiperProductsProps {
  products: {
    data: {
      product: GetProductItem[];
    };
  };
  favs: GetProductItem[];
}

const SwiperProducts: React.FC<SwiperProductsProps> = ({ products, favs }) => {
  const productsList = products?.data?.product || [];
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevButton = prevRef.current;
    const nextButton = nextRef.current;

    if (prevButton && nextButton) {
      prevButton.classList.add("custom-prev-button");
      nextButton.classList.add("custom-next-button");
    }
  }, []);

  const handleSwiperInit = (swiper: Swiper) => {
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  };

  return (
    <Box sx={swiperContainerStyles}>
      <Box sx={overlayStyles}>
        <IconButton ref={prevRef} sx={navButtonStyles}>
          <FaArrowLeftLong size={24} />
        </IconButton>
        <IconButton ref={nextRef} sx={navButtonStyles}>
          <FaArrowRightLong size={24} />
        </IconButton>
      </Box>

      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        loop={true}
        pagination={{ clickable: true }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onInit={handleSwiperInit}
        modules={[Pagination, Navigation]}
      >
        {productsList.slice(0, 20).map((product) => (
          <SwiperSlide key={product._id}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ProductCard product={product} favs={favs} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SwiperProducts;
