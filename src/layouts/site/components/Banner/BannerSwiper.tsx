import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import { Box, Typography } from "@mui/material";

const BannerSwiper = () => {
  return (
    <Box>
      <Swiper
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="mySwiper"
        style={{ width: "100vw", height: "100vh" }}
      >
        <SwiperSlide>
          <Box
            sx={{
              backgroundImage: `url('src/assets/hp-row-desk-2.webp')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "900px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              textAlign: "center",
              padding: 3,
            }}
          >
            <Box>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Autumn Collection 2024
              </Typography>
              <Typography variant="h6" sx={{ my: 2 }}>
                Discover the best looks for the new season
              </Typography>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box
            sx={{
              backgroundImage: `url('/src/assets/hp-row-desk-1.webp')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              textAlign: "center",
              padding: 3,
            }}
          >
            <Box>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Summer Sale Up to 50% Off
              </Typography>
              <Typography variant="h6" sx={{ my: 2 }}>
                Shop the hottest deals of the season
              </Typography>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default BannerSwiper;
