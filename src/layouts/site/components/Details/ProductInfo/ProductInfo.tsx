import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperRef } from "swiper";
import { useState, useRef } from "react";
// Import Swiper styles
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
import { GetProductItem } from "../../../../dashboard/pages/ProductsDashboard/types";

type ProductInfoProps = {
  product: GetProductItem;
  isFavorite: boolean;
  handleFavoriteClick: (e: React.MouseEvent) => void;
  handleAddToBasket: (e: React.MouseEvent) => void;
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  isFavorite,
  handleFavoriteClick,
  handleAddToBasket,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const swiper1Ref = useRef<SwiperRef | null>(null);
  const productImages = product?.images as { url: string; public_id: string }[];

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      sx={{ gap: 4, p: 2 }}
    >
      <Box sx={{ width: "50vw" }}>
        <Swiper
          style={{
            "--swiper-navigation-color": "transparent",
            "--swiper-pagination-color": "transparent",
            height: "90vh",
          }}
          onSwiper={(swiper) => {
            if (swiper1Ref.current !== null) {
              swiper1Ref.current = swiper;
            }
          }}
          spaceBetween={10}
          navigation
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="swiper-details"
        >
          {productImages?.map((image) => (
            <SwiperSlide className="slide-item" key={image.public_id}>
              <Box component="figure" sx={{ width: "90vh" }}>
                <img
                  src={image?.url}
                  alt="swiper"
                  style={{
                    width: "37vw",
                    height: "94vh",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className="swiper-images"
        >
          {productImages?.map((image) => (
            <SwiperSlide className="slide-image" key={image.public_id}>
              <Box component="figure" sx={{ height: "60vh" }}>
                <img src={image?.url} alt="swiper" style={{ width: "100%" }} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box className="product-details-info" p={2} sx={{ pt: 9 }}>
        <Typography variant="h4" gutterBottom>
          {product?.title}
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Typography variant="body2" sx={{ textDecoration: "line-through" }}>
            ${product?.productPrice}
          </Typography>
          <Typography variant="h6">${product?.salePrice}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          {product?.stock > 0 ? (
            <IoMdCheckboxOutline color="green" />
          ) : (
            <IoAlertOutline color="red" />
          )}
          <Typography>
            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </Typography>
        </Box>

        <Typography variant="body1" mb={2}>
          {product?.description}
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <IconButton
            onClick={handleAddToBasket}
            sx={{
              backgroundColor: "#ebebeb",
              borderRadius: "50%",
              "&:hover": { backgroundColor: "#26c6d0" },
            }}
          >
            <HiOutlineShoppingBag />
          </IconButton>

          <IconButton onClick={handleFavoriteClick}>
            {isFavorite ? (
              <IoHeart color="red" />
            ) : (
              <IoHeartOutline color="black" />
            )}
          </IconButton>
        </Box>

        <Box display="flex" gap={2}>
          <IconButton>
            <FaFacebookF />
          </IconButton>
          <IconButton>
            <FaTwitter />
          </IconButton>
          <IconButton>
            <TiSocialGooglePlus />
          </IconButton>
          <IconButton>
            <TbBrandPinterest />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductInfo;
