import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Box, IconButton } from "@mui/material";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useRef } from "react";

interface Product {
  _id: string;
}

interface SwiperProductsProps {
  products: {
    data: {
      product: Product[];
    };
  };
  favs: { product_id: string }[];
}

const SwiperProducts: React.FC<SwiperProductsProps> = ({ products, favs }) => {
  const productss = products?.data?.product || [];
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      prevRef.current.classList.add("custom-prev-button");
      nextRef.current.classList.add("custom-next-button");
    }
  }, []);

  return (
    <Box
      className="swiper-elements"
      sx={{
        position: "relative",
        width: "100%",
        marginTop: 7,
        marginBottom: 7,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        top="50%"
        left={0}
        right={0}
        zIndex={10}
        sx={{ transform: "translateY(-50%)" }}
      >
        <IconButton
          ref={prevRef}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            borderRadius: "50%",
            width: 48,
            height: 48,
            mx: 2,
          }}
        >
          <FaArrowLeftLong size={24} />
        </IconButton>

        <IconButton
          ref={nextRef}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            borderRadius: "50%",
            width: 48,
            height: 48,
            mx: 2,
          }}
        >
          <FaArrowRightLong size={24} />
        </IconButton>
      </Box>

      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        loop={true}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation!.prevEl = prevRef.current;
          swiper.params.navigation!.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Pagination, Navigation]}
        className="swiper-product"
      >
        {productss.slice(0, 20).map((product) => (
          <SwiperSlide key={product._id}>
            <Box className="slider" display="flex" justifyContent="center">
              <ProductCard product={product} favs={favs} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SwiperProducts;
