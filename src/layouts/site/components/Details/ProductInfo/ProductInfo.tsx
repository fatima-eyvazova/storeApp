import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperRef } from "swiper";
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
import { GetProductItem } from "../../../../dashboard/pages/ProductsDashboard/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/types";
import {
  iconButtonStyle,
  productInfoBox,
  swiperStlyle,
  titleInfoStile,
} from "../../../../../constants";

type ProductInfoProps = {
  product: GetProductItem;
  isFavorite: boolean;
  handleFavoriteClick: (e: React.MouseEvent) => void;
  handleAddToBasket: (e: React.MouseEvent) => void;
};

const ProductInfo: React.FC<ProductInfoProps> = React.memo(
  ({ product, isFavorite, handleFavoriteClick, handleAddToBasket }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const { token, user } = useSelector((state: RootState) => state.auth);

    const swiper1Ref = useRef<SwiperRef | null>(null);
    const productImages = product?.images as {
      url: string;
      public_id: string;
    }[];

    const isClient = token && user?.role === "client";
    const isProductInStock = product.stock > 0;
    const handleSwiper = (swiper: SwiperRef | null) => {
      if (swiper1Ref.current) {
        swiper1Ref.current = swiper;
      }
    };
    const isThumbsSwiperValid = thumbsSwiper && !thumbsSwiper.destroyed;

    return (
      <Box sx={productInfoBox}>
        <Box sx={{ width: "50vw" }}>
          <Swiper
            style={swiperStlyle}
            onSwiper={handleSwiper}
            spaceBetween={10}
            navigation
            thumbs={{
              swiper: isThumbsSwiperValid ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {productImages?.map((image) => (
              <SwiperSlide key={image.public_id}>
                <Box component="figure" sx={{ width: "90vh" }}>
                  <img
                    src={image?.url}
                    alt="swiper"
                    style={{
                      width: "37vw",
                      height: "87vh ",
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
          >
            {productImages?.map((image) => (
              <SwiperSlide key={image.public_id}>
                <Box component="figure" sx={{ height: "60vh" }}>
                  <img
                    src={image?.url}
                    alt="swiper"
                    style={{ width: "100%" }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <Box sx={{ pt: 9, p: 2 }}>
          <Typography variant="h4" gutterBottom>
            {product?.title}
          </Typography>

          <Box sx={titleInfoStile}>
            <Typography variant="body2" sx={{ textDecoration: "line-through" }}>
              ${product?.productPrice}
            </Typography>
            <Typography variant="h6">${product?.salePrice}</Typography>
          </Box>

          <Box sx={titleInfoStile}>
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

          <Box sx={titleInfoStile}>
            <IconButton
              onClick={handleAddToBasket}
              sx={iconButtonStyle}
              disabled={!isClient || !isProductInStock}
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

          <Box sx={{ gap: 2, display: "flex" }}>
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
  }
);

export default ProductInfo;
