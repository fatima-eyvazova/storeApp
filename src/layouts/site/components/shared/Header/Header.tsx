import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Toolbar,
  IconButton,
  Badge,
  Box,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { useTranslation } from "react-i18next";

import Navbar from "./Navbar/Navbar";
import { RootState } from "../../../../../redux/types";
import { ROUTES } from "../../../../../router/routeNames";
import LogOutModal from "../../../../shared/modals/LogOutModal/LogOutModal";
import { useGetSiteInfoQuery } from "../../../../../redux/slices/shared/apiSlice";
import AdminSiteInfo from "./AdminSiteInfo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { i18n } = useTranslation();

  const { token, user } = useSelector((state: RootState) => state.auth);
  const { data: siteInfo, isLoading, isError } = useGetSiteInfoQuery();
  console.log("siteInfo", siteInfo?.data?.name);

  const userRole = user?.role;

  const logOutUserHandler = (e) => {
    e.preventDefault();
    setOpenLogoutModal(true);
  };

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  // if (isLoading) return <Typography>Loading...</Typography>;
  // if (isError) return <Typography>Error loading site info</Typography>;

  return (
    <>
      <Box sx={{ position: "static", backgroundColor: "#e9ecef" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#1E899A",
                }}
              >
                <AdminSiteInfo />
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
            <Select
              defaultValue="en"
              onChange={handleLanguageChange}
              sx={{ marginRight: "16px" }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ru">Русский</MenuItem>
              <MenuItem value="az">Azərbaycanca</MenuItem>
            </Select>
            {userRole === "client" && token && (
              <Box onClick={logOutUserHandler} sx={{ fontSize: "22px" }}>
                <CiLogin />
              </Box>
            )}
            {!token && (
              <Link to={ROUTES.login}>
                <IconButton>
                  <FaRegUserCircle />
                </IconButton>
              </Link>
            )}
            <IconButton
              aria-label="cart"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <Badge color="secondary">
                <HiOutlineShoppingBag />
              </Badge>
            </IconButton>
            {isOpen && (
              <Box>
                <Box>
                  <IconButton onClick={() => setIsOpen(false)}>
                    <IoCloseSharp />
                  </IconButton>
                  <Box>
                    <Link to={`/${ROUTES.basket}`}>View </Link>
                    <Link to={`/${ROUTES.checkout}`}>Checkout</Link>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Box>
      <Navbar />
      {openLogoutModal && <LogOutModal setOpenModal={setOpenLogoutModal} />}
    </>
  );
};

export default Header;
