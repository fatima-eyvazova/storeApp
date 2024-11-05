import { Link } from "react-router-dom";
import { Toolbar, Box, Button } from "@mui/material";
import { ROUTES } from "../../../../../../router/routeNames";
import { useTranslation } from "react-i18next";
import {
  linksBox,
  navbarBox,
  navbarToolbar,
} from "../../../../../../constants";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <Box sx={navbarBox}>
      <Toolbar sx={navbarToolbar}>
        <Box sx={linksBox}>
          <Button component={Link} to={ROUTES.home} color="inherit">
            {t("home")}
          </Button>
          <Button component={Link} to={ROUTES.shop} color="inherit">
            {t("shop")}
          </Button>
          <Button component={Link} to={ROUTES.favorites} color="inherit">
            {t("favorites")}
          </Button>
          <Button component={Link} to={ROUTES.basket} color="inherit">
            {t("basket")}
          </Button>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Navbar;
