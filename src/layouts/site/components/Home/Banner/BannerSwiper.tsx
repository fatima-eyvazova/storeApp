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

  return (
    <Box>
      <Swiper
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[EffectFade, Pagination, Autoplay]}
        style={{ width: "100vw", height: "100vh" }}
      >
        <SwiperSlide>
          <Box sx={bannerSlideStyles}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {t("autumnCollection")}
              </Typography>
              <Typography variant="h6" sx={{ my: 2 }}>
                {t("autumnDescription")}
              </Typography>
            </Box>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box sx={bannerStyles}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {t("summerSale")}
              </Typography>
              <Typography variant="h6" sx={{ my: 2 }}>
                {t("summerDescription")}
              </Typography>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default BannerSwiper;
