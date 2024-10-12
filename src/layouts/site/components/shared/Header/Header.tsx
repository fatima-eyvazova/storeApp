import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toolbar, IconButton, Badge, Box } from "@mui/material";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";

import Navbar from "./Navbar/Navbar";
import { RootState } from "../../../../../redux/types";
import { ROUTES } from "../../../../../router/routeNames";
import LogOutModal from "../../../../shared/modals/LogOutModal/LogOutModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  //   const basketProducts = useSelector(
  //     (state: RootState) => state.basket.basketProducts
  //   );
  //   const total = useSelector((state: RootState) => state.basket.total);
  const { token, user } = useSelector((state: RootState) => state.auth);

  const userRole = user?.role;

  //   const itemCount = basketProducts.length;

  const logOutUserHandler = (e) => {
    e.preventDefault();
    setOpenLogoutModal(true);
  };

  return (
    <>
      <Box sx={{ position: "static", backgroundColor: "#e9ecef" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img src="/src/assets/images/logo.png" alt="logo" />
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
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
                    <Link to={`/${ROUTES.basket}`}>View Cart</Link>
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
