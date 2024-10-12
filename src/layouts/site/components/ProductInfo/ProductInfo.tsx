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
import { IoAlertOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
// import { GrFavorite } from "react-icons/gr";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import { TiSocialGooglePlus } from "react-icons/ti";
import { TbBrandPinterest } from "react-icons/tb";

import { useDispatch } from "react-redux";
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";
import { GetProductItem } from "../../../dashboard/pages/ProductsDashboard/types";
import { addToBasket } from "../../../../redux/slices/site/basketSlice";

type ProductInfoProps = {
  product: GetProductItem;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      addToBasket({
        ...product,
        quantity,
      })
    );
  };

  const swiper1Ref = useRef<SwiperRef | null>(null);
  const productImages = product?.images as { url: string; public_id: string }[];

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={4}
      className="product-info"
      p={2}
    >
      <Box sx={{ width: "50vw" }}>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
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
              <Box component="figure">
                <img src={image?.url} alt="swiper" style={{ width: "100%" }} />
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
              <Box component="figure">
                <img src={image?.url} alt="swiper" style={{ width: "100%" }} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box className="product-details-info" p={2} sx={{ maxWidth: "500px" }}>
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
          <Typography variant="body2">Qty:</Typography>
          <TextField
            type="number"
            size="small"
            inputProps={{ min: 1 }}
            defaultValue={1}
            onChange={(event) => setQuantity(+event.target.value)}
            sx={{ maxWidth: "80px" }}
          />
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HiOutlineShoppingBag />}
            disabled={product?.stock === 0}
            onClick={addToCart}
          >
            Add to Cart
          </Button>

          {/* <IconButton onClick={handleWishList}> */}
          {/* <GrFavorite style={{ color: color ? "red" : "black" }} /> */}
          {/* </IconButton> */}
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
