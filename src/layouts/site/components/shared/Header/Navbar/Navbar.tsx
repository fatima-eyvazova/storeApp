import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Button,
} from "@mui/material";
import { ROUTES } from "../../../../../../router/routeNames";

const Navbar = () => {
  return (
    <Box sx={{ position: "static", backgroundColor: "black", color: "white" }}>
      <Toolbar
        sx={{
          width: "97vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component="div">
          MyApp
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "40vw",
            justifyContent: "space-between",
          }}
        >
          <Button component={Link} to={ROUTES.home} color="inherit">
            Home
          </Button>
          <Button component={Link} to={ROUTES.products} color="inherit">
            Products
          </Button>
          <Button component={Link} to={`/${ROUTES.wishlist}`} color="inherit">
            Favorites
          </Button>
          <Button component={Link} to={`/${ROUTES.basket}`} color="inherit">
            Basket
          </Button>
        </Box>
        <InputBase
          placeholder="Find a product…"
          style={{
            color: "inherit",
            backgroundColor: "#fff",
            borderRadius: "4px",
            padding: "4px 8px",
            marginRight: "16px",
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </Toolbar>
    </Box>
  );
};

export default Navbar;
