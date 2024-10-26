import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../router/routeNames";
import {
  collectionTitleStyles,
  imageContainerStyles,
  imageStyles,
  innovationsBoxStyles,
  innovationsContainerStyles,
  newArrivalsTextStyles,
  shopNowButtonStyles,
  shoppingExperienceTextStyles,
} from "../../../../constants";

const Innovations = () => {
  const { t } = useTranslation();

  return (
    <Box sx={innovationsContainerStyles}>
      <Box sx={innovationsBoxStyles}>
        <Box
          sx={{
            padding: "48px 0 0",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={newArrivalsTextStyles}>
            {t("newArrivals")}
          </Typography>
          <Typography variant="h2" sx={collectionTitleStyles}>
            {t("womenCollection")} <br />
            {t("autumnFashion")}
          </Typography>
          <Typography sx={shoppingExperienceTextStyles}>
            {t("shoppingExperience")}
          </Typography>

          <Link to={ROUTES.shop} style={shopNowButtonStyles}>
            {t("shopNow")}
          </Link>
        </Box>
        <Box sx={imageContainerStyles}>
          <Box
            component="img"
            src="/src/assets/banner-6.webp"
            alt="banner"
            sx={imageStyles}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Innovations;
