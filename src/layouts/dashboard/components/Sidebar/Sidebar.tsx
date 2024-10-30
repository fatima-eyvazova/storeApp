import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { TbBrandSafari, TbBrand4Chan } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../router/routeNames";
import { RootState } from "../../../../redux/types";
import LogOutModal from "../../../shared/modals/LogOutModal/LogOutModal";
import LinkItem from "./LinkItem/LinkItem";
import { sidebarBox } from "../../../../constants";

const Sidebar = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const navigate = useNavigate();
  const adminInfo = useSelector((state: RootState) => state.auth.user);
  const userRole = adminInfo?.role;

  const menuItems = [
    {
      path: ROUTES.orders,
      name: "Orders",
      icon: <TbBrandSafari />,
    },
    {
      path: ROUTES.dashboardProducts,
      name: "Products",
      icon: <MdOutlineProductionQuantityLimits />,
    },
    {
      path: ROUTES.analyst,
      name: "Analyst",
      icon: <SiSimpleanalytics />,
    },
    {
      path: ROUTES.category,
      name: "Categories",
      icon: <TbBrand4Chan />,
    },
    {
      name: "Log Out",
      icon: <IoIosLogOut />,
    },
  ];

  if (userRole === "superadmin") {
    menuItems.splice(2, 0, {
      path: ROUTES.ourStaff as never,
      name: "Our Staff",
      icon: <RiAdminLine />,
    });
  }

  const logOutUserHandler = () => {
    setOpenLogoutModal(true);
  };

  const handleNavigation = (path: string | undefined) => {
    if (path) {
      navigate(path);
    } else {
      logOutUserHandler();
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            backgroundColor: "black",
            color: "white",
            width: isOpen ? "250px" : "60px",
            transition: "width 0.3s ease",
          }}
        >
          <Box sx={sidebarBox}>
            {isOpen && (
              <Box
                component="img"
                src="/src/assets/images/logo.png"
                alt="logo"
                sx={{
                  width: "100px",
                  marginRight: "20px",
                }}
              />
            )}
            <Box
              sx={{ cursor: "pointer", marginLeft: isOpen ? "0px" : "10px" }}
            >
              <FaBars onClick={() => setIsOpen(!isOpen)} />
            </Box>
          </Box>

          {menuItems.map((item, index) => (
            <LinkItem
              key={index}
              icon={item.icon}
              name={item.name}
              isOpen={isOpen}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </Box>
        <Box sx={{ flex: 1, padding: "20px" }}>{children}</Box>
      </Box>
      {openLogoutModal && <LogOutModal setOpenModal={setOpenLogoutModal} />}
    </>
  );
};

export default Sidebar;
