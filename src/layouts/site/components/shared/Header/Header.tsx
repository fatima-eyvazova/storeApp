import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Toolbar,
  IconButton,
  Box,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useTranslation } from "react-i18next";

import Navbar from "./Navbar/Navbar";
import { RootState } from "../../../../../redux/types";
import { ROUTES } from "../../../../../router/routeNames";
import LogOutModal from "../../../../shared/modals/LogOutModal/LogOutModal";
import AdminSiteInfo from "./AdminSiteInfo";
import {
  languageBox,
  languageTypography,
  loginBoxButton,
} from "../../../../../constants";

const Header = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { i18n } = useTranslation();

  const { token, user } = useSelector((state: RootState) => state.auth);

  const userRole = user?.role;

  const logOutUserHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOpenLogoutModal(true);
  };

  const handleLanguageChange = (event: {
    target: { value: string | undefined };
  }) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      <Box sx={{ position: "static", backgroundColor: "#e9ecef" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to={ROUTES.home} style={{ textDecoration: "none" }}>
              <Typography variant="h4" sx={languageTypography}>
                <AdminSiteInfo />
              </Typography>
            </Link>
          </Box>
          <Box sx={languageBox}>
            <Select
              value={i18n.language}
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
            <Box sx={loginBoxButton}>
              {!token && (
                <Link to={ROUTES.login}>
                  <IconButton>
                    <FaRegUserCircle />
                  </IconButton>
                </Link>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Box>
      <Navbar />
      {openLogoutModal && <LogOutModal setOpenModal={setOpenLogoutModal} />}
    </>
  );
};

export default Header;
